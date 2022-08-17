import { HomeScreen } from '../screens/HomeScreen';
import { MainNav } from './navigator';

import { userProfileAtom } from '@/user/atoms/userProfileAtom';

const MainNavBuilder = MainNav.build(({ Screen }) => {
  const isAuthenticated = userProfileAtom().role !== 'anonymous';

  // using atom of other feature to handle screen rendering
  return isAuthenticated ? (
    <>
      <Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
    </>
  ) : null;
});

export { MainNavBuilder };
