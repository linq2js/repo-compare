import { DrawerActions } from '@react-navigation/native';

import { invokeNavigation } from './comps/NavigationContainer';

const goBack = () => {
  invokeNavigation((nav) => nav.goBack());
};

const openDrawer = () => {
  invokeNavigation((nav) => nav.dispatch(DrawerActions.openDrawer()));
};

const closeDrawer = () => {
  invokeNavigation((nav) => nav.dispatch(DrawerActions.closeDrawer()));
};

export { goBack, openDrawer, closeDrawer };
