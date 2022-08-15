import { NavigatorScreenParams, RouteProp, ParamListBase } from '@react-navigation/native';
import type { useMediaQuery } from 'native-base';
import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast';

import { Component, FC } from 'react';

type UseMediaQueryParams = Parameters<typeof useMediaQuery>;

export const repoTypes = ['github', 'pubdev', 'npm'] as const;

export type Query = UseMediaQueryParams extends Array<infer T> ? T : never;

export type RepoType = ValueOf<typeof repoTypes>;

export type RepoInfo = {
  type: RepoType;
  key: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
};

export type SearchPayload = {
  name: string;
  count: number;
  excludes?: string[];
};

export type SearchResult<T> = {
  total: number;
  items: T[];
};

export interface VoidFunction {
  (): void;
}

export type ToastInfo = InterfaceToastProps & { type?: 'error' | 'info' };

export type ValueOf<T> = T extends Array<infer I>
  ? I
  : T extends { [key: number]: infer I }
  ? I
  : never;

export type AnyComponent<P> =
  | Component<P>
  | FC<P>
  | (new (props: P) => Component)
  | ((props: P) => unknown);

export type PropsOf<T> = T extends AnyComponent<infer P> ? P : never;

export type ScreenProps<T extends ParamListBase, N extends keyof T> = {
  route: RouteProp<T, N>;
};

/**
 * use to nested screen params
 */
export type ScreenParams<T> = NavigatorScreenParams<T>;

export type ThemeData = {
  textColor: string;
  backColor: string;
};
