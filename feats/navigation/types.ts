/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ReactNode } from 'react';

import { PropsOf } from '@/types';

export class StackNavigatorWrapper<P extends ParamListBase> {
  wrapped = createNativeStackNavigator<P>();
}

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

export type LoadingRenderer = (
  rootStack: Omit<StackNavigatorWrapper<ParamListBase>['wrapped'], 'Navigator'>,
) => ReactNode;

export type ErrorRenderer = (
  rootStack: Omit<StackNavigatorWrapper<ParamListBase>['wrapped'], 'Navigator'>,
  error: unknown,
) => ReactNode;

export type RootNavigatorProps = Omit<
  PropsOf<StackNavigatorWrapper<{}>['wrapped']['Navigator']>,
  'children'
> & {
  navigators: Navigator<any>[];
  renderer?: (screens: ReactNode, rootStack: StackNavigatorWrapper<{}>['wrapped']) => ReactNode;
  getFatalError?: () => Error;
  isLoading?: () => boolean;
  /**
   * render screen when there is any error (getFatalError(), reactive error)
   */
  errorRenderer?: ErrorRenderer;
  /**
   * render screen when isLoading() === true or there is any reactive object is loading
   */
  loadingRenderer?: LoadingRenderer;
};
