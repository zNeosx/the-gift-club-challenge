import { Typography } from '@mui/material';

type Props = {
  message: string | undefined;
};

const InputErrorMessage = ({ message }: Props) => {
  return (
    <Typography
      component={'p'}
      style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}
    >
      {message}
    </Typography>
  );
};

export default InputErrorMessage;
