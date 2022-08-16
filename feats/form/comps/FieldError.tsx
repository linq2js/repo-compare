import { Text } from 'native-base';

import { ControllerRenderProps, FieldPath, useController } from 'react-hook-form';

import { FieldProps } from '../types';

export type Props<T, N extends FieldPath<T>> = FieldProps<T, N> & {
  message: string | ((error: unknown, field: ControllerRenderProps<T, N>) => string);
};

const FieldError = <T, N extends FieldPath<T>>({ name, control, message }: Props<T, N>) => {
  const { field, fieldState } = useController({ control, name });
  if (fieldState.error) {
    return (
      <Text>{typeof message === 'function' ? message(fieldState.error, field) : message}</Text>
    );
  }
  return null;
};

export { FieldError };
