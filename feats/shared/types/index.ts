import type { useMediaQuery } from 'native-base';
import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast';

import { Component, FC } from 'react';

import { mediaQueries } from '../configs';

type UseMediaQueryParams = Parameters<typeof useMediaQuery>;

export const repoTypes = ['github', 'pubdev', 'npm'] as const;

export type MediaQuries = keyof typeof mediaQueries;

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

export type ResponsiveData<T> = {
  fallback: T;
  ios?: { [key in MediaQuries | 'fallback']?: T };
  android?: { [key in MediaQuries | 'fallback']?: T };
} & {
  [key in MediaQuries]?: T;
};

export type ResponsiveValue<T> = {
  responsiveData: ResponsiveData<T>;
};

export type MaybeResponsiveValue<T> = T | ResponsiveValue<T>;

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
