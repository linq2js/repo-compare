import { stable } from 'rativ/react';

import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';

const LoadingScreen = stable(() => (
  <ThemedBox flex={1}>
    <ThemedText>Loading...</ThemedText>
  </ThemedBox>
));

export { LoadingScreen };
