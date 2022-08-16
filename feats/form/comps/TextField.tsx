import { Input } from 'native-base';

import { FieldPath, PathValue, useController } from 'react-hook-form';

import { FieldProps } from '../types';
import { FieldError, Props as ErrorProps } from './FieldError';

import { PropsOf } from '@/types';

export type Props<T, N extends FieldPath<T>> = FieldProps<T, N> &
  PropsOf<typeof Input> & { errorProps?: Omit<ErrorProps<T, N>, 'control' | 'name'> };

const TextField = <T, N extends FieldPath<T>>({
  name,
  control,
  defaultValue,
  errorProps,
  rules,
  ...props
}: Props<T, N>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: (defaultValue ?? '') as PathValue<T, N>,
    rules,
  });

  const inputNode = (
    <Input
      {...props}
      value={field.value as string}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
    />
  );

  const errorNode = errorProps && <FieldError control={control} name={name} {...errorProps} />;

  if (!errorNode) {
    return inputNode;
  }

  return (
    <>
      {inputNode}
      {errorNode}
    </>
  );
};

export { TextField };
