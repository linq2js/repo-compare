import { ITheme, theme as themeBase } from 'native-base';

const theme: ITheme = {
  ...themeBase,
  colors: {
    ...themeBase.colors,
    primary: themeBase.colors.blue,
    secondary: themeBase.colors.gray,
  },
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
    '2xl': 1536,
  },
};

export { theme };
