import { Button } from 'native-base';

import { loginSignal } from '../signals/loginSignal';

import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';
import { createScreen } from '@/shared/helpers/createScreen';

const LoginScreen = createScreen(() => () => {
  return (
    <ThemedBox flex={1}>
      <ThemedText>Login Screen</ThemedText>
      <Button onPress={() => loginSignal({ username: 'bill', password: '123456' })}>Login</Button>
    </ThemedBox>
  );
});

export { LoginScreen };
