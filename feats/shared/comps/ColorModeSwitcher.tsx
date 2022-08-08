import { IColorModeContextProps, Switch, useColorMode } from 'native-base';
import { stable } from 'rativ/react';

/**
 * this component demostrate how to share value between stable part and unstable part
 */
const ColorModeSwitcher = stable(() => {
  // stable part
  let colorModeContext: IColorModeContextProps | undefined;

  const changeColorMode = (isDark: boolean) => {
    colorModeContext?.setColorMode(isDark ? 'dark' : 'light');
  };

  return () => {
    // unstable part
    colorModeContext = useColorMode();
    return <Switch onToggle={changeColorMode} isChecked={colorModeContext.colorMode === 'dark'} />;
  };
});

export { ColorModeSwitcher };
