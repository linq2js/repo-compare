import { stable } from 'rativ/react';

import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';

export type Props = { error: Error };

const FatalError = stable((props: Props) => (
  <ThemedBox flex={1}>
    <ThemedText>Fatal Error {String(props.error)}</ThemedText>
  </ThemedBox>
));

export { FatalError };
