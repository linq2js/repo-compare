import { ITheme, useBreakpointValue } from 'native-base';
import { atom } from 'rativ';

import { memo } from 'react';

export type Breakpoint = keyof ITheme['breakpoints'];
const currentBreakpointAtom = atom<Breakpoint>('base');

const ResponsiveProvider = memo(() => {
  const breakpoint = useBreakpointValue({
    '2xl': '2xl',
    base: 'base',
    lg: 'lg',
    md: 'md',
    sm: 'sm',
    xl: 'xl',
  }) as Breakpoint;
  currentBreakpointAtom.set(breakpoint);

  return null;
});

export { ResponsiveProvider, currentBreakpointAtom };
