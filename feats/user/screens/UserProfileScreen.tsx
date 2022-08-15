import { Button } from 'native-base';

import { userProfileAtom } from '../atoms/userProfileAtom';
import { logoutSignal } from '../signals/logoutSignal';

import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';
import { createScreen } from '@/shared/helpers/createScreen';

const UserProfileScreen = createScreen(() => {
  return () => {
    return (
      <ThemedBox flex={1}>
        <ThemedText>{userProfileAtom().username}</ThemedText>
        <Button onPress={() => logoutSignal()}>Logout</Button>
      </ThemedBox>
    );
  };
});

export { UserProfileScreen };
