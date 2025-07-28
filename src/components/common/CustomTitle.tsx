import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
};

const CustomTitle = ({ title }: Props) => {
  return (
    <Box
      sx={{
        borderLeft: 8,
        borderTopLeftRadius: '2px',
        borderBottomLeftRadius: '2px',
        paddingLeft: 2,
        borderColor: 'primary.main',
      }}
    >
      <Typography component={'h6'} sx={{ fontSize: '16px' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default CustomTitle;
