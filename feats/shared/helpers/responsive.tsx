import { ReactNode } from 'react';
import { Platform } from 'react-native';

import { currentBreakpointAtom, Breakpoint } from '../comps/ResponsiveProvider';

type Renderer = () => ReactNode;

type OS = typeof Platform['OS'];

type ResponsiveKey = Breakpoint | OS;

// make fallback prop is optional
export type ResponsiveConfigs = {
  [key in ResponsiveKey]?: Renderer | ResponsiveConfigs;
};

const os = Platform.OS;

/**
 * render components responsively
 * @param configs
 * @returns
 */
const responsive = (configs: ResponsiveConfigs) => {
  const breakpoint = currentBreakpointAtom();
  const renderer = findRenderer(configs, breakpoint);

  return <>{renderer?.()}</>;
};

function findRenderer(configs: ResponsiveConfigs, breakpoint: Breakpoint) {
  let renderer: Renderer | undefined;
  Object.keys(configs).some((key) => {
    const value = configs[key as ResponsiveKey];
    if (!value) return false;

    const match = key === os || key === breakpoint;

    if (typeof value === 'function') {
      if (match) {
        renderer = value;
        return true;
      }
      return false;
    }

    // value is sub query
    if (match) {
      renderer = findRenderer(value, breakpoint);
      if (renderer) return true;
    }
  });

  return renderer ?? (typeof configs.base === 'function' ? configs.base : undefined);
}

export { responsive };
