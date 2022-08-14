import { stable } from 'rativ/react';

import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';

/**
 * DO NOT USE createScreen to create the LoadingScreen
 */
const Loading = stable(() => (
  <ThemedBox flex={1}>
    <ThemedText>Loading...</ThemedText>
  </ThemedBox>
));

export { Loading };
