import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stable } from 'rativ/react';

import { createElement, Fragment, ReactNode } from 'react';

import { RootNavigatorProps } from '../types';

import { isPromiseLike } from '@/shared/helpers/isPromiseLike';
import { PropsOf } from '@/types';

/**
 * RootNavigator handles rendering of multiple child navigators. When evaluating child navigator,
 * if the child navigator uses reactive object (atoms) and that object is suspending,
 * an promise object will be thrown and RootNavigator will capture that and call loadingRenderer to get list of screen for loading status.
 * If there is unhandled error throwns, RootNavigator will capture that error and call errorRenderer to get list of screen for error status
 */
const RootNavigator = stable((props: RootNavigatorProps) => {
  const Stack = createNativeStackNavigator();
  const renderDefaultNavigator = (node: ReactNode, navigatorProps: unknown) =>
    createElement(Stack.Navigator, navigatorProps as PropsOf<typeof Stack.Navigator>, node);

  // using unstable part to support atom, hook
  // so child navigator can use atom/hook to control screen rendering
  return () => {
    const {
      renderer,
      loadingRenderer,
      errorRenderer,
      getFatalError,
      isLoading,
      builders,
      ...otherProps
    } = props;
    // handle fatal error
    const fatalError = getFatalError?.();
    if (fatalError) {
      if (!errorRenderer) throw fatalError;
      return renderDefaultNavigator(errorRenderer(Stack, fatalError), otherProps);
    }

    if (isLoading?.()) {
      if (!loadingRenderer) throw Error('No loadingRenderer is present');
      return renderDefaultNavigator(loadingRenderer(Stack), otherProps);
    }

    try {
      const children = builders.map((x) => x(Stack)).filter((x) => Boolean(x));
      const result = createElement(Fragment, {}, ...children);
      if (renderer) {
        return renderer(result, Stack);
      }
      return renderDefaultNavigator(result, otherProps);
    } catch (ex) {
      if (isPromiseLike(ex)) {
        if (!loadingRenderer) throw ex;
        return renderDefaultNavigator(loadingRenderer(Stack), otherProps);
      }
      if (errorRenderer) {
        return renderDefaultNavigator(errorRenderer(Stack, ex), otherProps);
      }

      throw ex;
    }
  };
});

export { RootNavigator };
