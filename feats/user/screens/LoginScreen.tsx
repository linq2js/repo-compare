import { Button, Heading, VStack } from 'native-base';
import { stable } from 'rativ/dist/tsc/react';

import { useForm } from 'react-hook-form';

import { loginSignal } from '../signals/loginSignal';

import { TextField } from '@/form/comps/TextField';
import { ThemedBox } from '@/shared/comps/ThemedBox';
import { createScreen } from '@/shared/helpers/createScreen';

export type LoginFormModel = {
  username: string;
  password: string;
};

const LoginScreen = createScreen(() => <LoginScreenImpl />);

const LoginScreenImpl = stable(() => {
  // define handleSubmit in stable part
  const handleSubmit = ({ username, password }: LoginFormModel) => {
    loginSignal({ username, password });
  };

  return () => {
    const { control, handleSubmit: onSubmit } = useForm<LoginFormModel>();

    return (
      <ThemedBox flex={1} p={4}>
        <VStack space="md">
          <Heading>Login</Heading>
          <TextField
            control={control}
            name="username"
            rules={{ required: true }}
            placeholder="Enter any username to login"
            errorProps={{ message: 'Invalid email or password' }}
          />

          <TextField
            control={control}
            name="password"
            rules={{ required: true }}
            placeholder="123456"
            errorProps={{ message: 'Invalid email or password' }}
          />
          <Button onPress={onSubmit(handleSubmit)}>Submit</Button>
        </VStack>
      </ThemedBox>
    );
  };
});

export { LoginScreen, LoginScreenImpl };
