import { Stack, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import HaloBox from '../common/HaloBox';
import { Input } from '../ui/input';
import InputErrorMessage from '../common/InputErrorMessage';

const ColorCustomization = () => {
  const { control, watch } = useFormContext();

  return (
    <Stack
      sx={{
        alignItems: { xs: 'center', lg: 'start' },
        paddingLeft: { lg: 8 },
        gap: 3,
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 6,
          justifyContent: { xs: 'center', md: 'start' },
          marginTop: { xs: 4, md: 10 },
          maxWidth: '250px',
        }}
      >
        <Stack sx={{ gap: 3, alignItems: 'center' }}>
          <HaloBox color={watch('configuration.colors.primary')} />
          <Controller
            name={'configuration.colors.primary'}
            control={control}
            render={({ field, fieldState }) => (
              <Stack>
                <Input
                  {...field}
                  sx={{
                    width: '100px',
                    '& input': { textTransform: 'uppercase' },
                  }}
                  error={!!fieldState.error}
                />
                {fieldState.error && (
                  <InputErrorMessage message={fieldState.error.message} />
                )}
              </Stack>
            )}
          />
        </Stack>
        <Stack sx={{ gap: 3, alignItems: 'center' }}>
          <HaloBox color={watch('configuration.colors.secondary')} />
          <Controller
            name={'configuration.colors.secondary'}
            control={control}
            render={({ field, fieldState }) => (
              <Stack>
                <Input
                  {...field}
                  sx={{
                    width: '100px',
                    '& input': { textTransform: 'uppercase' },
                  }}
                  error={!!fieldState.error}
                />
                {fieldState.error && (
                  <InputErrorMessage message={fieldState.error.message} />
                )}
              </Stack>
            )}
          />
        </Stack>
      </Stack>
      <Typography component={'p'} sx={{ maxWidth: '250px', color: 'gray' }}>
        Personnalisez votre jeu en ajoutant jusqu'à deux couleurs
      </Typography>
    </Stack>
  );
};

export default ColorCustomization;
