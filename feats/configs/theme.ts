import { extendTheme, theme } from 'native-base';

const themeConfigs = extendTheme({
  dark: {
    textColor: theme.colors.lightText,
    backColor: theme.colors.gray['800'],
  },
  light: {
    textColor: theme.colors.darkText,
    backColor: theme.colors.white,
  },
  colors: {
    ...theme.colors,
    primary: theme.colors.blue,
    secondary: theme.colors.gray,
  },
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
    '2xl': 1536,
  },
  components: {},
  config: {},
});

export { themeConfigs };
