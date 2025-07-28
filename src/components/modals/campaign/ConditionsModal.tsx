import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Stack,
  Typography,
} from '@mui/material';
import {
  FormProvider,
  useForm,
  type UseFieldArrayAppend,
  type UseFieldArrayUpdate,
} from 'react-hook-form';
import type z from 'zod';
import {
  conditionsSchema,
  type CampaignFormData,
} from '../../../lib/validations/campaign.schema';
import { ModalType, useModalStore } from '../../../stores/modal.store';
import type { Conditions } from '../../../types';
import { FormField } from '../../ui/FormField';
import { FormItem } from '../../ui/FormItem';
import { FormMessage } from '../../ui/FormMessage';
import { Input } from '../../ui/input';
import { nanoid } from 'nanoid';

interface ConditionModalProps {
  action: 'ADD' | 'EDIT';
  appendCondition?: UseFieldArrayAppend<
    CampaignFormData,
    'configuration.retrievalConditions'
  >;
  updateCondition?: UseFieldArrayUpdate<
    CampaignFormData,
    'configuration.retrievalConditions'
  >;
  giftId?: string;
  condition?: Conditions;
  index?: number;
}

const formSchema = conditionsSchema.omit({
  id: true,
  giftId: true,
});

const ConditionModal = () => {
  const { currentModal, closeModal, modalProps } = useModalStore();
  const isOpen = currentModal === ModalType.ADD_EDIT_CONDITION;

  const { action, appendCondition, updateCondition, giftId, condition, index } =
    modalProps as ConditionModalProps;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: condition?.name ?? '',
      value: condition?.value ?? '',
    },
  });

  if (!isOpen) return null;

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (action === 'ADD') {
      appendCondition?.({
        id: nanoid(),
        giftId: giftId!,
        ...data,
      });
    } else {
      updateCondition?.(index!, {
        id: condition!.id,
        giftId: condition!.giftId,
        ...data,
      });
    }

    closeModal();
    return;
  }
  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth="xs" fullWidth>
      <DialogTitle>Condition pour le gain</DialogTitle>
      <DialogContent>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage message={fieldState.error?.message} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Valeur</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
      </DialogContent>
    </Dialog>
  );
};

export default ConditionModal;
