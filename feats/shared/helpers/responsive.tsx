import { ReactNode } from 'react';
import { Platform } from 'react-native';

import { matchQueriesAtom } from '../comps/ResponsiveProvider';
import { ResponsiveData } from '../types';

type Renderer = () => ReactNode;

// make fallback prop is optional
export type ResponsiveConfigs = Omit<ResponsiveData<Renderer>, 'fallback'> & {
  fallback?: Renderer;
};

/**
 * render everything responsively
 * ```js
 * <Responsive/>
 * ```
 * @param configs
 * @returns
 */
const responsive = (configs: ResponsiveConfigs) => {
  const os = Platform.OS;
  const specific = {
    ...configs,
    ...((os === 'ios' ? configs.ios : os === 'android' ? configs.android : undefined) ?? configs),
  };

  const matchQuery = matchQueriesAtom().find((x) => x in specific);
  const renderFn = matchQuery ? specific[matchQuery] : specific.fallback;
  return <>{renderFn?.()}</>;
};

export { responsive };
