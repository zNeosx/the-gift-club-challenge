import { Stack, Switch, Typography } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  control?: Control<T>;
  name?: Path<T>;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  borderColor?: string;
  label: string;
  description: string;
};

const ToggleOptionControlled = <T extends FieldValues>({
  control,
  name,
  checked,
  onChange,
  borderColor = 'primary.main',
  label,
  description,
}: Props<T>) => {
  return (
    <Stack>
      <Stack
        sx={{
          borderLeft: 8,
          borderTopLeftRadius: '2px',
          borderBottomLeftRadius: '2px',
          paddingLeft: { xs: 2, md: 3 },
          borderColor,
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            component={'p'}
            sx={{ fontSize: '14px', fontWeight: 'bold' }}
          >
            {label}
          </Typography>

          {control && name ? (
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Switch
                  color="secondary"
                  checked={field.value}
                  onChange={(_, val) => field.onChange(val)}
                />
              )}
            />
          ) : (
            <Switch
              color="secondary"
              checked={checked || false}
              onChange={(_, val) => onChange?.(val)}
            />
          )}
        </Stack>
      </Stack>
      <Typography
        component={'p'}
        sx={{
          fontSize: '14px',
          paddingLeft: { xs: 3, md: 4 },
          maxWidth: 500,
          color: 'gray',
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default ToggleOptionControlled;
