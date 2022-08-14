/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ReactNode } from 'react';

import { invokeNavigation } from '../comps/NavigationContainer';
import { Navigator, StackNavigatorWrapper } from '../types';

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

export { createNavigator };
