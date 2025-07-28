import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { GAMES } from '../../constants';
import { useEffect } from 'react';

const CampaignGames = () => {
  const { watch, setValue } = useFormContext();

  const gameType = watch('configuration.game_type');
  const profile = watch('profile');

  useEffect(() => {
    if (profile === 'BASIC') {
      setValue('configuration.game_type', 'WHEEL', {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [profile, setValue]);

  return (
    <Grid container spacing={4}>
      {GAMES.map((game) => {
        const isActive = game.name === gameType;

        const activeStyle = {
          border: 4,
          borderRadius: 4,
          borderColor: 'primary.main',
        };

        return (
          <Grid
            key={game.name}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{
              cursor: 'pointer',
              pointerEvents: profile !== 'BASIC' ? 'auto' : 'none',
              '&:hover': {
                border: 4,
                borderRadius: 4,
                borderColor: 'primary.main',
              },
              ...(isActive ? activeStyle : {}),
            }}
          >
            <img
              src={game.url}
              alt={`${game.name} game illustration`}
              style={{
                objectFit: 'cover',
                borderRadius: 6,
                width: '100%',
              }}
              onClick={() => {
                if (profile !== 'BASIC') {
                  setValue('configuration.game_type', game.name, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CampaignGames;
