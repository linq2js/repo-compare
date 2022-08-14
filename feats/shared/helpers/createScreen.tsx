/* eslint-disable @typescript-eslint/no-explicit-any */
import { Refs, slot, stable, StableOptions } from 'rativ/react';

import { ReactNode, Suspense, SuspenseProps } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Loading } from '../comps/Loading';
import { isPromiseLike } from './isPromiseLike';

import { goBack } from '@/navigation/navigator';

/**
 * create a screen component that is based on stable component.
 * The returned screen component will handle Suspense fallabck automatically if no descendant component handle it
 * @param component
 * @param options
 * @returns
 */
const createScreen = <P extends Record<string, any>, R extends Refs<{}, any>>(
  component: (props: P, refs: R) => any,
  {
    loadingRenderer = () => <Loading />,
    errorRenderer,
    safeArea,
    ...options
  }: StableOptions & {
    safeArea?: boolean;
    loadingRenderer?: () => SuspenseProps['fallback'];
    errorRenderer?: (
      error: Error,
      resetErrorBoundary: (...args: unknown[]) => unknown,
    ) => ReactNode;
  } = {},
) => {
  return stable((props: P, refs: R) => {
    const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
      return <>{errorRenderer?.(error, resetErrorBoundary)}</>;
    };

    const renderWithSafeArea = (content: ReactNode) => {
      if (!safeArea) return content;
      return <SafeAreaView style={{ flex: 1 }}>{content}</SafeAreaView>;
    };

    try {
      const result = component(props, refs);
      let renderResult = typeof result === 'function' ? slot(result) : result;

      renderResult = <Suspense fallback={loadingRenderer()}>{renderResult}</Suspense>;

      if (errorRenderer) {
        renderResult = (
          <ErrorBoundary FallbackComponent={ErrorFallback}>{renderResult}</ErrorBoundary>
        );
      }

      return renderWithSafeArea(renderResult);
    } catch (ex) {
      if (isPromiseLike(ex)) {
        if (loadingRenderer) {
          return renderWithSafeArea(loadingRenderer());
        }
        throw ex;
      }
      if (errorRenderer) {
        return renderWithSafeArea(
          <ErrorFallback error={ex as Error} resetErrorBoundary={goBack} />,
        );
      }
      throw ex;
    }
  }, options);
};

export { createScreen };
