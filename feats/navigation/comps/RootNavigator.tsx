import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { stable } from 'rativ/react';

import { createElement, Fragment, ReactNode } from 'react';

import { RootNavigatorProps } from '../types';

import { isPromiseLike } from '@/shared/helpers/isPromiseLike';
import { PropsOf } from '@/types';

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
      navigators,
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
      const children = navigators.map((x) => x.render(Stack)).filter((x) => Boolean(x));
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