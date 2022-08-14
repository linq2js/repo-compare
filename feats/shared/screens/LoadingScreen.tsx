import { Loading } from '../comps/Loading';
import { createScreen } from '../helpers/createScreen';

/**
 * DO NOT USE createScreen to create the LoadingScreen
 */
const LoadingScreen = createScreen(() => <Loading />, { safeArea: true });

export { LoadingScreen };
