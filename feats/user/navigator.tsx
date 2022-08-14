import { userProfileAtom } from './atoms/userProfileAtom';
import { LoginScreen } from './screens/LoginScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';

import { createNavigator } from '@/navigation/helpers/createnavigator';

type Params = {
  login: undefined;
  user_profile: undefined;
};

const UserNav = createNavigator<Params>(({ Screen }) =>
  userProfileAtom() ? (
    <>
      <Screen name="user_profile" component={UserProfileScreen} />
    </>
  ) : (
    <>
      <Screen name="login" component={LoginScreen} />
    </>
  ),
);

export { UserNav };
