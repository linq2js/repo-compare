/* eslint-disable @typescript-eslint/no-explicit-any */
import { i18n, StringMap, TFunction, TOptions } from 'i18next';
import { FieldPath, Path, PathValue } from 'rativ/dist/tsc/util/pathTypes';
import { slot } from 'rativ/react';

import React, { createElement, ReactNode, useMemo } from 'react';
import { Trans, TransProps, useTranslation } from 'react-i18next';

import { ThemedText } from '@/shared/comps/ThemedText';
import { PropsOf } from '@/types';

export interface I18nUtils {
  is(lang: string): boolean;
  change(lang: string): void;
}

export interface Translate<TKey> extends I18nUtils {
  /**
   * translate the key to text
   */
  (key: TKey, options?: TOptions<StringMap> & { postifx?: string }): string;
  /**
   * using <Trans/> component to render the translation key
   * @param key
   * @param options
   */
  render(key: TKey, options?: TransProps<string> & { postifx?: string }): React.ReactElement;

  error<T>(key: TKey, param?: string): (value: T, postfix?: string) => string;
}

export interface UseTypedTranslation<T> {
  <TKey extends Path<T>>(ns: TKey): Translate<keyof PathValue<T, TKey>>;
  <TKey extends Path<T>>(ns: TKey[]): {
    [key in TKey]: Translate<keyof PathValue<T, TKey>>;
  } & I18nUtils;
}

export type TranslatedSlot<T> = {
  <
    N extends keyof T,
    TT extends T[N],
    K extends TT extends Record<string, unknown> ? FieldPath<TT> : never,
  >(
    ns: N,
    render: (translate: (key: K) => string) => unknown,
  ): ReactNode;

  /**
   * create Text component from translated text
   */
  <K extends T extends Record<string, unknown> ? FieldPath<T> : never>(
    key: K,
    props?: PropsOf<typeof ThemedText>,
  ): ReactNode;
};

function createTranslateFn(t: TFunction, i18next: i18n, prefix: string) {
  const translate = (key: string, options: any) => {
    return t(`${prefix}.${key}` + (options?.postfix ? '.' + options.postfix : ''), options);
  };
  return Object.assign(translate, {
    is(lang: string) {
      return i18next.language === lang;
    },
    render(key: string, options: any) {
      return createElement(Trans, {
        t,
        i18nKey: `${prefix}.${key}` + (options?.postfix ? '.' + options.postfix : ''),
        ...options,
      });
    },
    error(key: string, param?: string) {
      return (value: unknown, postfix?: string) =>
        translate(key, { postfix, [param ?? '']: value });
    },
    change(lang: string) {
      i18next.changeLanguage(lang);
    },
  });
}

const memoHook = useMemo;

function createTranslator<T extends Record<string, unknown>, K extends keyof T>(
  _: T,
  rootNs: K,
): [UseTypedTranslation<T[K]>, TranslatedSlot<T[K]>] {
  const useTypedTranslation = (ns: unknown) => {
    const [t, i] = useTranslation(rootNs as string);
    let factory: () => any;
    if (Array.isArray(ns)) {
      factory = () => {
        const result: Record<string, Translate<string>> = {};
        ns.forEach((k) => {
          result[k] = createTranslateFn(t, i, k) as unknown as Translate<string>;
        });
        Object.assign(result, {
          is(lang: string) {
            return i.language === lang;
          },
          change(lang: string) {
            i.changeLanguage(lang);
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result as any;
      };
    } else {
      factory = () => createTranslateFn(t, i, ns as string);
    }
    return memoHook(factory, [t, ...(Array.isArray(ns) ? ns : [ns])]);
  };

  return [
    useTypedTranslation,
    (ns: string, render: unknown) => {
      if (typeof render === 'function') {
        return slot(() => {
          const t = useTypedTranslation(ns);
          return render(t);
        });
      }
      return slot(() => {
        const [t] = useTranslation(rootNs as string);
        return createElement(
          ThemedText,
          {
            ...(render as Record<string, unknown>),
          },
          t(ns),
        );
      });
    },
  ];
}

export { createTranslator };
