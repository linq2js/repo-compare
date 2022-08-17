import { ReactNode } from 'react';
import { ControllerRenderProps, FieldPath, useController } from 'react-hook-form';

import { FieldProps } from '../types';
import { InlineError } from './InlineError';

export type Props<T, N extends FieldPath<T>> = Pick<FieldProps<T, N>, 'name' | 'control'> & {
  message: ReactNode | ((error: unknown, field: ControllerRenderProps<T, N>) => ReactNode);
};

const FieldError = <T, N extends FieldPath<T>>({ name, control, message }: Props<T, N>) => {
  const { field, fieldState } = useController({ control, name });
  if (fieldState.error) {
    return (
      <InlineError
        message={typeof message === 'function' ? message(fieldState.error, field) : message}
      />
    );
  }
  return null;
};

export { FieldError };
