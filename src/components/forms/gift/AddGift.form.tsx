import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { nanoid } from 'nanoid';
import {
  FormProvider,
  useForm,
  type UseFieldArrayAppend,
} from 'react-hook-form';
import * as z from 'zod';
import { translateGiftType } from '../../../lib/utils';
import {
  giftSchema,
  giftTypeSchema,
  type CampaignFormData,
} from '../../../lib/validations/campaign.schema';
import { useModalStore } from '../../../stores/modal.store';
import { FormField } from '../../ui/FormField';
import { FormItem } from '../../ui/FormItem';
import { FormMessage } from '../../ui/FormMessage';
import { Input } from '../../ui/input';

type Props = {
  addGift: UseFieldArrayAppend<CampaignFormData, 'configuration.gifts'>;
  addCondition: UseFieldArrayAppend<
    CampaignFormData,
    'configuration.retrievalConditions'
  >;
};
const formSchema = giftSchema
  .omit({
    id: true,
  })
  .extend({
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

const AddGiftForm = ({ addGift, addCondition }: Props) => {
  const { closeModal } = useModalStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'DISCOUNT',
      limit: 10,
      initial_limit: 10,
      icon: '',
      drawDate: '',
    },
  });

  const watchType = form.watch('type');

  function onSubmit(data: z.infer<typeof formSchema>) {
    const giftId = nanoid();
    addGift({
      id: giftId,
      ...data,
    });

    if (data.type !== 'LOSS') {
      addCondition({
        id: nanoid(),
        giftId,
        name: 'Aucune',
        value: 'none',
      });
    }
    closeModal();
    form.reset();
    return;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Frite" {...field} />
                </FormControl>
                <FormMessage message={fieldState.error?.message} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <Select value={field.value} onChange={field.onChange}>
                    {giftTypeSchema.options.map((gift) => (
                      <MenuItem key={gift} value={gift}>
                        {translateGiftType(gift)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage message={fieldState.error?.message} />
              </FormItem>
            )}
          />
          {watchType === 'DRAW' && (
            <FormField
              control={form.control}
              name="drawDate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Date du tirage</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage message={fieldState.error?.message} />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="limit"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage message={fieldState.error?.message} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initial_limit"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Stock initial</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage message={fieldState.error?.message} />
              </FormItem>
            )}
          />
          <Button variant="contained" type="submit">
            <Typography
              variant="body1"
              sx={{ textTransform: 'initial' }}
              component={'span'}
            >
              Ajouter
            </Typography>
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default AddGiftForm;
