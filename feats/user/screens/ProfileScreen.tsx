import { Button } from 'native-base';
import { stable } from 'rativ/react';

import { logoutSignal } from '../signals/logoutSignal';

import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';

const ProfileScreen = stable(() => () => {
  return (
    <ThemedBox flex={1}>
      <ThemedText>Profile Screen</ThemedText>
      <Button onPress={() => logoutSignal()}>Logout</Button>
    </ThemedBox>
  );
});

export { ProfileScreen };
