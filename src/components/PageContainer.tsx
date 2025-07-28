import { Box, type BoxProps } from '@mui/material';
import type { PropsWithChildren } from 'react';

const PageContainer = ({
  children,
  ...props
}: PropsWithChildren & BoxProps) => {
  const { sx, ...otherProps } = props;
  return (
    <Box
      sx={{ paddingLeft: 4, paddingRight: { xs: 4, lg: 10 }, ...sx }}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
