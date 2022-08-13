/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DrawerActions,
  ParamListBase,
  NavigationContainerRefWithCurrent,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ReactNode } from 'react';

import { Navigator, StackNavigatorWrapper } from '../types';

const navigationContainerRef = createNavigationContainerRef();

const invokeNavigation = <T extends ParamListBase>(
  invoker: (navigation: NavigationContainerRefWithCurrent<T>) => void,
) => {
  if (!navigationContainerRef.isReady) return;
  invoker(navigationContainerRef as NavigationContainerRefWithCurrent<T>);
};

const createNavigator = <P extends ParamListBase = ParamListBase>(
  builder: (rootStack: Omit<StackNavigatorWrapper<P>['wrapped'], 'Navigator'>) => ReactNode,
) => {
  return Object.assign(
    (...args: Parameters<Navigator<P>>) => {
      invokeNavigation<P>((nav) => nav.navigate(...args));
    },
    {
      render(stack: ReturnType<typeof createNativeStackNavigator>) {
        return builder(stack as StackNavigatorWrapper<P>['wrapped']);
      },
    },
  ) as Navigator<P>;
};

const goBack = () => {
  invokeNavigation((nav) => nav.goBack());
};

const openDrawer = () => {
  invokeNavigation((nav) => nav.dispatch(DrawerActions.openDrawer()));
};

const closeDrawer = () => {
  invokeNavigation((nav) => nav.dispatch(DrawerActions.closeDrawer()));
};

export { createNavigator, navigationContainerRef, goBack, openDrawer, closeDrawer };
