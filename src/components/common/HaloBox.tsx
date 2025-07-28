import { Box, type SxProps } from '@mui/material';
type Props = {
  sxProps?: SxProps;
  color?: string;
};
const HaloBox = ({ sxProps, color = 'primary.main' }: Props) => {
  return (
    <Box
      sx={{
        width: '70px',
        borderRadius: '6rem',
        height: '200px',
        bgcolor: color,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '125%',
          height: '108%',
          zIndex: -1,
          borderRadius: 'inherit',
          opacity: 0.15,
          backgroundColor: color,
        },
        ...sxProps,
      }}
    />
  );
};

export default HaloBox;
