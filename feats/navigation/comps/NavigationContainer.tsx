import {
  NavigationContainer as OriginalNavigationContainer,
  createNavigationContainerRef,
  ParamListBase,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import { stable } from 'rativ/dist/tsc/react';

import { navigationStateAtom } from '../atoms/navigationStateAtom';
import { navigationReadySignal } from '../signals/navigationReadySignal';
import { naviationStateChangeSignal } from '../signals/navigationStateChangeSignal';

import { PropsOf } from '@/types';

const navigationContainerRef = createNavigationContainerRef();

const invokeNavigation = <T extends ParamListBase>(
  invoker: (navigation: NavigationContainerRefWithCurrent<T>) => void,
) => {
  if (!navigationContainerRef.isReady) return;
  invoker(navigationContainerRef as NavigationContainerRefWithCurrent<T>);
};

const NavigationContainer = stable((props: PropsOf<typeof OriginalNavigationContainer>) => () => {
  return (
    <OriginalNavigationContainer
      {...props}
      ref={navigationContainerRef}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialState={navigationStateAtom() as any}
      onReady={navigationReadySignal}
      onStateChange={(state) => state && naviationStateChangeSignal(state)}
    />
  );
});

export { NavigationContainer, invokeNavigation };
