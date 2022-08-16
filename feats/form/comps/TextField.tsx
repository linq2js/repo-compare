import { Input } from 'native-base';

import { FieldPath, PathValue, useController } from 'react-hook-form';

import { FieldProps } from '../types';

import { PropsOf } from '@/types';

export type Props<T, N extends FieldPath<T>> = FieldProps<T, N> & PropsOf<typeof Input>;

const TextField = <T, N extends FieldPath<T>>({
  name,
  control,
  defaultValue,
  rules,
  ...props
}: Props<T, N>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: (defaultValue ?? '') as PathValue<T, N>,
    rules,
  });

  return (
    <Input
      {...props}
      value={field.value as string}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
    />
  );
};

export { TextField };
