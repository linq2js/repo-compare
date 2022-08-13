// import { HomeScreen } from './screens/HomeScreen';
import { HomeScreen } from './screens/HomeScreen';

import { createNavigator } from '@/shared/helpers/navigator';

type Params = {
  home: undefined;
};

const MainNavigator = createNavigator<Params>(({ Screen }) => (
  <>
    <Screen name="home" component={HomeScreen} />
  </>
));

export { MainNavigator };
