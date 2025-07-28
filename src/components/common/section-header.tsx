import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  subtitle: string;
};

const SectionHeader = ({ title, subtitle }: Props) => {
  return (
    <Stack
      sx={{
        borderLeft: 8,
        borderTopLeftRadius: '2px',
        borderBottomLeftRadius: '2px',
        paddingLeft: { xs: 2, md: 3 },
        paddingBottom: 1,
        borderColor: 'primary.main',
        marginBottom: 6,
      }}
    >
      <Typography
        variant="h5"
        component={'h3'}
        sx={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
      <Typography component={'p'} sx={{ fontSize: { xs: '14px', md: '16px' } }}>
        {subtitle}
      </Typography>
    </Stack>
  );
};

export default SectionHeader;
