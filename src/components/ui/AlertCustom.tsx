import { Box, Stack, styled, Typography, type SxProps } from '@mui/material';
import React from 'react';

type AlertVariant = 'warning' | 'info' | 'error' | 'success';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  sx?: SxProps;
}

const AlertWrapper = styled(Stack)<{ variant: AlertVariant }>(
  ({ theme, variant }) => {
    const colors = {
      warning: {
        bg: theme.palette.warning.light,
        border: theme.palette.warning.main,
        color: theme.palette.warning.dark,
      },
      info: {
        bg: theme.palette.info.light,
        border: theme.palette.info.main,
        color: theme.palette.info.dark,
      },
      error: {
        bg: theme.palette.error.light,
        border: theme.palette.error.main,
        color: theme.palette.error.dark,
      },
      success: {
        bg: theme.palette.success.light,
        border: theme.palette.success.main,
        color: theme.palette.success.dark,
      },
    };

    return {
      gap: 8,
      borderLeft: `12px solid ${colors[variant].border}`,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    };
  }
);

const AlertContentWrapper = styled(Box)<{ variant: AlertVariant }>(
  ({ theme, variant }) => {
    const colors = {
      warning: {
        bg: theme.palette.warning.light,
        border: theme.palette.warning.main,
        color: theme.palette.warning.dark,
      },
      info: {
        bg: theme.palette.info.light,
        border: theme.palette.info.main,
        color: theme.palette.info.dark,
      },
      error: {
        bg: theme.palette.error.light,
        border: theme.palette.error.main,
        color: theme.palette.error.dark,
      },
      success: {
        bg: theme.palette.success.light,
        border: theme.palette.success.main,
        color: theme.palette.success.dark,
      },
    };

    return {
      marginLeft: 8,
      backgroundColor: colors[variant].bg,
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '20px',
      paddingRight: '20px',
      color: colors[variant].color,
      // borderLeft: `6px solid ${colors[variant].border}`,
      // paddingLeft: theme.spacing(2),
      // borderRadius: theme.shape.borderRadius,
      // fontSize: theme.typography.body2.fontSize,
    };
  }
);

const AlertTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(0.5),
}));

const AlertDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
}));

const Alert: React.FC<AlertProps> = ({ variant = 'warning', sx, children }) => {
  return (
    <AlertWrapper variant={variant} sx={sx}>
      <AlertContentWrapper variant={variant}>{children}</AlertContentWrapper>
    </AlertWrapper>
  );
};

export { Alert, AlertDescription, AlertTitle };
