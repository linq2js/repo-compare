import { useColorModeValue } from 'native-base';
import { slot } from 'rativ/dist/tsc/react';

import { ReactNode } from 'react';

import { darkTheme, lightTheme } from '@/configs/theme';
import { ThemeData } from '@/types';

const themed = (renderFn: (themeData: ThemeData) => ReactNode) => {
  return slot(() => {
    const themeData = useColorModeValue(lightTheme, darkTheme);
    return renderFn(themeData);
  });
};

export { themed };
