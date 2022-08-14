import { Button } from 'native-base';
import { atom, delay } from 'rativ';

import { logoutSignal } from '../signals/logoutSignal';

import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';
import { createScreen } from '@/shared/helpers/createScreen';

const UserProfileScreen = createScreen(() => {
  const loadingAtom = atom<number>(0);

  loadingAtom.set(delay(3000).then(() => 1));

  return () => {
    loadingAtom();
    return (
      <ThemedBox flex={1}>
        <ThemedText>Profile Screen</ThemedText>
        <Button onPress={() => logoutSignal()}>Logout</Button>
      </ThemedBox>
    );
  };
});

export { UserProfileScreen };
