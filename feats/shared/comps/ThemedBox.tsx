import { Box, useColorModeValue } from 'native-base';

import { themeConfigs } from '@/configs/theme';
import { PropsOf } from '@/types';

const ThemedBox = (props: PropsOf<typeof Box>) => {
  const color = useColorModeValue(themeConfigs.light.backColor, themeConfigs.dark.backColor);

  return <Box bg={color} {...props} />;
};

export { ThemedBox };
