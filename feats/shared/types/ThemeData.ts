import { ColorSwatch } from './ColorSwatch';
import { ThemeType } from './ThemeType';

export type ColorScheme = {
  primary: ColorSwatch;
  secondary: ColorSwatch;
  success: ColorSwatch;
  danger: ColorSwatch;
  warning: ColorSwatch;
  border: ColorSwatch;
  back: ColorSwatch;
  text: ColorSwatch;
  white: ColorSwatch;
  black: ColorSwatch;
};

export type ThemeData = {
  type: ThemeType;
  colors: ColorScheme;
};
