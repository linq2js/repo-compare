/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DrawerActions,
  ParamListBase,
  NavigationContainerRefWithCurrent,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stable } from 'rativ/react';

import { createElement, Fragment, ReactNode } from 'react';

import { PropsOf } from '@/types';

export type Navigator<P extends ParamListBase> = {
  render(stack: ReturnType<typeof createNativeStackNavigator>): ReactNode;
  <R extends keyof P>(name: R, ...args: P[R] extends undefined ? [] : [P[R]]): void;
  <R extends keyof P>(
    options:
      | {
          key: string;
          params?: P[R];
          merge?: boolean;
        }
      | {
          name: R;
          key?: string;
          params: P[R];
          merge?: boolean;
        },
  ): void;
};

export type RootNavigatorProps = Omit<
  PropsOf<StackNavigatorWrapper<{}>['wrapped']['Navigator']>,
  'children'
> & {
  navigators: Navigator<any>[];
  render?: (screens: ReactNode, rootStack: StackNavigatorWrapper<{}>['wrapped']) => ReactNode;
};

class StackNavigatorWrapper<P extends ParamListBase> {
  wrapped = createNativeStackNavigator<P>();
}

const navigationRef = createNavigationContainerRef();

const invokeNavigation = <T extends ParamListBase>(
  invoker: (navigation: NavigationContainerRefWithCurrent<T>) => void,
) => {
  if (!navigationRef.isReady) return;
  invoker(navigationRef as NavigationContainerRefWithCurrent<T>);
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

const NavigatorGroup = stable((props: RootNavigatorProps) => {
  const Stack = createNativeStackNavigator();
  // using unstable part to support atom, hook
  // so child navigator can use atom/hook to control screen rendering
  return () => {
    const { render, navigators, ...otherProps } = props;
    const children = navigators.map((x) => x.render(Stack));
    const fragment = createElement(Fragment, {}, ...children);
    if (render) return render(fragment, Stack);
    return createElement(Stack.Navigator, otherProps as PropsOf<typeof Stack.Navigator>, fragment);
  };
});

const RootNavigator = stable((props: RootNavigatorProps) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <NavigatorGroup {...props} />
    </NavigationContainer>
  );
});

const goBack = () => {
  invokeNavigation((nav) => nav.goBack());
};

const openDrawer = () => {
  invokeNavigation((nav) => nav.dispatch(DrawerActions.openDrawer()));
};

const closeDrawer = () => {
  invokeNavigation((nav) => nav.dispatch(DrawerActions.closeDrawer()));
};

export { createNavigator, RootNavigator, goBack, openDrawer, closeDrawer };
