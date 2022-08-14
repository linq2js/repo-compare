import { stable } from 'rativ/react';

import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';

const BootstrapingScreen = stable(() => (
  <ThemedBox flex={1}>
    <ThemedText>Bootstraping...</ThemedText>
  </ThemedBox>
));

export { BootstrapingScreen };
