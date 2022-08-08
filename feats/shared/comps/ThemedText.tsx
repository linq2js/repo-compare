import { Text, useColorModeValue } from 'native-base';

import { themeConfigs } from '@/configs/theme';
import { PropsOf } from '@/types';

const ThemedText = (props: PropsOf<typeof Text>) => {
  const color = useColorModeValue(themeConfigs.light.textColor, themeConfigs.dark.textColor);
  return <Text color={color} {...props} />;
};

export { ThemedText };
