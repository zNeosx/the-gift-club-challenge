import { Typography } from '@mui/material';

export const FormMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <Typography variant="caption" color="error">
      {message}
    </Typography>
  );
};
