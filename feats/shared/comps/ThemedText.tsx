import { Text, useColorModeValue } from 'native-base';

import { darkTheme, lightTheme } from '@/configs/theme';
import { PropsOf, ThemeData } from '@/types';

const ThemedText = (props: PropsOf<typeof Text>) => {
  const theme = useColorModeValue(lightTheme, darkTheme) as ThemeData;

  return <Text color={theme.textColor} {...props} />;
};

export { ThemedText };
