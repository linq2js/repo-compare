import { stable } from 'rativ/react';

import { AddRepoButton } from '../comps/AddRepoButton';

import { ColorModeSwitcher } from '@/shared/comps/ColorModeSwitcher';
import { ThemedBox } from '@/shared/comps/ThemedBox';

const HomeScreen = stable(() => (
  <ThemedBox flex={1}>
    <ColorModeSwitcher />
    <AddRepoButton />
  </ThemedBox>
));

export { HomeScreen };
