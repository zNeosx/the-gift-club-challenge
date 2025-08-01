import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
  type UseFieldArrayInsert,
} from 'react-hook-form';
import type z from 'zod';
import { formatActionType } from '../../../lib/utils';
import {
  actionSchema,
  actionTypeSchema,
  type CampaignFormData,
} from '../../../lib/validations/campaign.schema';
import { ModalType, useModalStore } from '../../../stores/modal.store';
import { FormField } from '../../ui/FormField';
import { FormItem } from '../../ui/FormItem';
import { FormMessage } from '../../ui/FormMessage';
import { Input } from '../../ui/input';

interface CampaignAdActionModalProps {
  insertAction?: UseFieldArrayInsert<CampaignFormData, 'configuration.actions'>;
  priority: number;
}

const formSchema = actionSchema.omit({
  id: true,
  priority: true,
});

const CampaignAdActionModal = () => {
  const { currentModal, closeModal, modalProps } = useModalStore();
  const isOpen = currentModal === ModalType.ADD_ACTION;

  const { insertAction, priority } = modalProps as CampaignAdActionModalProps;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target: '',
      type: 'GOOGLE_REVIEW',
    },
  });

  if (!isOpen) return null;

  function onSubmit(data: z.infer<typeof formSchema>) {
    insertAction?.(priority, {
      id: nanoid(),
      ...data,
      priority,
    });

    form.reset();
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
                name="target"
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
                name="type"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select value={field.value} onChange={field.onChange}>
                        {actionTypeSchema.options.map((type) => (
                          <MenuItem key={type} value={type}>
                            {formatActionType(type)}
                          </MenuItem>
                        ))}
                      </Select>
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

export default CampaignAdActionModal;
