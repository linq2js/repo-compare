import { userProfileAtom } from './atoms/userProfileAtom';
import { LoginScreen } from './screens/LoginScreen';
import { TodoListScreen } from './screens/TodoListScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';

import { createNavigator } from '@/navigation/helpers/createnavigator';

type Params = {
  login: undefined;
  user_profile: undefined;
  todo_list: undefined;
};

const UserNav = createNavigator<Params>(({ Screen }) =>
  userProfileAtom().role !== 'anonymous' ? (
    <>
      <Screen name="user_profile" component={UserProfileScreen} />
      <Screen name="todo_list" component={TodoListScreen} />
    </>
  ) : (
    <>
      <Screen name="login" component={LoginScreen} />
    </>
  ),
);

export { UserNav };
