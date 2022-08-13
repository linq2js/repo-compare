import { userProfileAtom } from './atoms/userProfileAtom';
import { LoginScreen } from './screens/LoginScreen';
import { ProfileScreen } from './screens/ProfileScreen';

import { createNavigator } from '@/navigation/helpers/createnavigator';

type Params = {
  login: undefined;
  manage_user: undefined;
  profile: undefined;
};

const UserNav = createNavigator<Params>(({ Screen }) =>
  userProfileAtom() ? (
    <>
      <Screen name="profile" component={ProfileScreen} />
    </>
  ) : (
    <>
      <Screen name="login" component={LoginScreen} />
    </>
  ),
);

export { UserNav };
