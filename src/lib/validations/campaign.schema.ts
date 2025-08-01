import * as z from 'zod';

export const giftTypeSchema = z.enum([
  'EAT',
  'DRINK',
  'DISCOUNT',
  'LOSS',
  'DRAW',
]);

export const actionTypeSchema = z.enum([
  'INSTAGRAM',
  'GOOGLE_REVIEW',
  'TIKTOK',
  'FACEBOOK',
  'SPONSORSHIP',
]);

export const actionSchema = z.object({
  id: z.string(),
  priority: z.number().min(0),
  target: z.string().optional(),
  type: actionTypeSchema,
});

export const colorsSchema = z.object({
  primary: z
    .string()
    .regex(
      /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/,
      'Code hex invalide'
    ),
  secondary: z
    .string()
    .regex(
      /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/,
      'Code hex invalide'
    ),
});

export const giftSchema = z
  .object({
    id: z.string(),
    icon: z.string(),
    initial_limit: z.number().min(-1),
    limit: z.number().min(-1),
    name: z.string().min(1),
    type: giftTypeSchema,
    drawDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'DRAW' && !data.drawDate) {
      ctx.addIssue({
        code: 'custom',
        message:
          'La date du tirage est requise pour la catégorie Tirage au sort',
        path: ['drawDate'],
      });
    }
  });

export const conditionsSchema = z.object({
  id: z.string(),
  giftId: z.string().min(1),
  name: z.string().min(1),
  value: z.string().min(1),
});

export const configurationSchema = z
  .object({
    actions: z.array(actionSchema).refine(
      (actions) => {
        const types = actions.map((a) => a.type);
        return new Set(types).size === types.length;
      },
      {
        message: 'Les actions doivent être uniques',
        path: ['actions'], // ça mettra l'erreur sur configuration.actions
      }
    ),
    colors: colorsSchema,
    disabled: z.boolean(),
    game_type: z.enum(['WHEEL', 'SLOT_MACHINE', 'MYSTERY', 'CARD']),
    gifts: z.array(giftSchema),
    retrievalConditions: z.array(conditionsSchema),
    conditionsType: z.enum(['NONE', 'CUSTOM']),
    logo_uri: z.string(),
  })
  .superRefine((data, ctx) => {
    const giftIds = data.gifts.map((gift) => gift.id);

    data.retrievalConditions.forEach((condition, index) => {
      if (!giftIds.includes(condition.giftId)) {
        ctx.addIssue({
          code: 'custom',
          message: `Condition liée à un cadeau inexistant (giftId: ${condition.giftId})`,
          path: ['retrievalConditions', index, 'giftId'],
        });
      }
    });
  });

export const campaignSchema = z.object({
  id: z.string().optional(),
  profile: z.enum(['PREMIUM', 'BASIC']).optional(),
  configuration: configurationSchema,
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  enabled: z.boolean().optional(),
  label: z.string().min(3).optional(),
  placeId: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().optional(),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;
