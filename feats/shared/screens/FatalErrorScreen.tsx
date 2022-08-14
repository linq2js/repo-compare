import { FatalError } from '../comps/FatalError';
import { createScreen } from '../helpers/createScreen';

export type Props = { error: Error };

const FatalErrorScreen = createScreen((props: Props) => <FatalError {...props} />, {
  safeArea: true,
});

export { FatalErrorScreen };
