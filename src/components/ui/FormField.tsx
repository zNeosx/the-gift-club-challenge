import type {
  FieldValues,
  Path,
  Control,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import React from 'react';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  render: (props: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => React.ReactElement;
}

export function FormField<T extends FieldValues>({
  name,
  control,
  render,
}: FormFieldProps<T>) {
  return <Controller name={name} control={control} render={render} />;
}
