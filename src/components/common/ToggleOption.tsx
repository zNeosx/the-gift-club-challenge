import { Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
  borderColor?: string;
  label: string;
  description: string;
};

const ToggleOption = ({ borderColor, label, description }: Props) => {
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
        <Typography
          component={'p'}
          sx={{ fontSize: '14px', fontWeight: 'bold' }}
        >
          {label}
        </Typography>
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

export default ToggleOption;
