// import AsyncStorage from '@react-native-async-storage/async-storage';
import { spawn } from 'rativ/saga';

import { bootstrapedAtom } from '../atoms/bootstrapedAtom';
import { toastSignal } from '../signals/toastSignal';

import { navigationBoostrap } from '@/navigation/sagas/navigationBootstrap';
import { translationBootstrap } from '@/trans/sagas/translationBootstrap';
import { userBootstrap } from '@/user/sagas/userBootstrap';

/**
 * where to put all app bootstrapping logic
 */
const bootstrap = () => {
  // console.log('bootstrap');
  // AsyncStorage.clear();
  spawn(async ({ onError, all, set }) => {
    // handle unexpected error that throws by descendant tasks
    onError((error: Error) => {
      toastSignal({ type: 'error', description: error.message });
    });

    // wait until all feature bootstraped
    await all({ userBootstrap, translationBootstrap, navigationBoostrap });

    await set(bootstrapedAtom, true);
    // console.log('bootstraped');
  });
};

export { bootstrap };
