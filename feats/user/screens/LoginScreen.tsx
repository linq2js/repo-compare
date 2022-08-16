import { Button } from 'native-base';

import { useForm } from 'react-hook-form';

import { loginSignal } from '../signals/loginSignal';

import { FieldError } from '@/form/comps/FieldError';
import { TextField } from '@/form/comps/TextField';
import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';
import { createScreen } from '@/shared/helpers/createScreen';

export type LoginFormModel = {
  username: string;
  password: string;
};

const LoginScreen = createScreen(() => {
  // define handleSubmit in stable part
  const handleSubmit = ({ username, password }: LoginFormModel) => {
    loginSignal({ username, password });
  };

  return () => {
    const { control, handleSubmit: onSubmit } = useForm<LoginFormModel>();

    return (
      <ThemedBox flex={1}>
        <ThemedText>Login Screen</ThemedText>
        <TextField control={control} name="username" rules={{ required: true }} />
        <FieldError control={control} name="username" message="Invalid email or password" />
        <TextField control={control} name="password" rules={{ required: true }} />
        <FieldError control={control} name="password" message="Invalid email or password" />
        <Button onPress={onSubmit(handleSubmit)}>Submit</Button>
      </ThemedBox>
    );
  };
});

export { LoginScreen };
