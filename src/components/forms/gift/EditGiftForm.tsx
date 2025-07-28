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
import {
  FormProvider,
  useForm,
  type UseFieldArrayUpdate,
} from 'react-hook-form';
import type z from 'zod';
import { translateGiftType } from '../../../lib/utils';
import {
  giftSchema,
  giftTypeSchema,
  type CampaignFormData,
} from '../../../lib/validations/campaign.schema';
import { useModalStore } from '../../../stores/modal.store';
import type { Gift } from '../../../types';
import { FormField } from '../../ui/FormField';
import { FormItem } from '../../ui/FormItem';
import { FormMessage } from '../../ui/FormMessage';
import { Input } from '../../ui/input';

type Props = {
  editGift: UseFieldArrayUpdate<CampaignFormData, 'configuration.gifts'>;
  gift: Gift;
  index: number;
};
const formSchema = giftSchema.omit({
  id: true,
});

const EditGiftForm = ({ editGift, gift, index }: Props) => {
  const { closeModal } = useModalStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: gift.name ?? '',
      type: gift.type ?? 'DISCOUNT',
      limit: gift.limit ?? 10,
      initial_limit: gift.initial_limit ?? 10,
      icon: gift.icon ?? '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data', data);
    editGift(index, {
      id: gift.id,
      ...data,
    });

    closeModal();
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
              Modifier
            </Typography>
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default EditGiftForm;
