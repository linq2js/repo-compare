import { Box, useColorModeValue } from 'native-base';

import { darkTheme, lightTheme } from '@/configs/theme';
import { PropsOf, ThemeData } from '@/types';

const ThemedBox = (props: PropsOf<typeof Box>) => {
  const theme = useColorModeValue(lightTheme, darkTheme) as ThemeData;

  return <Box bg={theme.backColor} {...props} />;
};

export { ThemedBox };
