import { userProfileAtom } from '../atoms/userProfileAtom';
import { LoginScreen } from '../screens/LoginScreen';
import { TodoListScreen } from '../screens/TodoListScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { UserNav } from './navigator';

const UserNavBuilder = UserNav.build(({ Screen }) => {
  const isAuthenticated = userProfileAtom().role !== 'anonymous';

  return isAuthenticated ? (
    <>
      <Screen name="user_profile" component={UserProfileScreen} />
      <Screen name="todo_list" component={TodoListScreen} />
    </>
  ) : (
    <>
      <Screen name="login" component={LoginScreen} />
    </>
  );
});

export { UserNavBuilder };
