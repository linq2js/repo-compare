import { HomeScreen, NestedNavigator } from './screens/HomeScreen';

import { createNavigator } from '@/navigation/helpers/createnavigator';
import { ScreenParams } from '@/types';
import { userProfileAtom } from '@/user/atoms/userProfileAtom';

type Params = {
  home: undefined | ScreenParams<NestedNavigator>;
};

const MainNav = createNavigator<Params>(({ Screen }) =>
  // using atom of other feature to handle screen rendering
  userProfileAtom().role !== 'anonymous' ? (
    <>
      <Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
    </>
  ) : null,
);

export { MainNav };
