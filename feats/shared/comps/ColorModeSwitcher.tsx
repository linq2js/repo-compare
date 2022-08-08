import { IColorModeContextProps, Switch, useColorMode } from 'native-base';
import { Refs, stable } from 'rativ/react';

import { ThemedText } from './ThemedText';

const ColorModeSwitcher = stable((_, refs: Refs<{ colorModeContext: IColorModeContextProps }>) => {
  const changeColorMode = (isDark: boolean) => {
    refs.colorModeContext.setColorMode(isDark ? 'dark' : 'light');
  };

  return () => {
    refs.colorModeContext = useColorMode();

    return (
      <>
        <Switch
          onValueChange={changeColorMode}
          value={refs.colorModeContext.colorMode === 'dark'}
        />
        <ThemedText>{refs.colorModeContext.colorMode}</ThemedText>
      </>
    );
  };
});

export { ColorModeSwitcher };
