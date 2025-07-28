import * as React from 'react';
import { InputBase } from '@mui/material';
import { styled, type SxProps, type Theme } from '@mui/material/styles';

const StyledInput = styled(InputBase)(({ theme }) => ({
  display: 'flex',
  height: '44px', // h-11
  width: '100%',
  minWidth: 0,
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  padding: '0 12px',
  fontSize: '1rem', // text-base
  transition: 'color 0.2s, box-shadow 0.2s, border-color 0.2s',
  outline: 'none',
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}33`,
  },
  "&[aria-invalid='true']": {
    borderColor: theme.palette.error.main,
    boxShadow: `0 0 0 3px ${theme.palette.error.main}33`,
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '&::selection': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

type InputProps = React.ComponentProps<'input'> & {
  error?: boolean;
  sx?: SxProps<Theme>;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, sx, ...props }, ref) => {
    return (
      <StyledInput
        className={className}
        inputRef={ref}
        inputProps={{ ...props, 'aria-invalid': error ? 'true' : undefined }}
        sx={sx}
      />
    );
  }
);

Input.displayName = 'Input';
