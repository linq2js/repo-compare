import { Control, FieldPath, RegisterOptions } from 'react-hook-form';

export type FieldProps<T, N extends FieldPath<T>> = {
  name: N;
  control: Control<T>;
  rules?: Omit<RegisterOptions<T, N>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  defaultValue?: string;
};
