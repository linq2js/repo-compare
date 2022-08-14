import { spawn } from 'rativ/saga';

import { bootstrapedAtom } from '../atoms/bootstrapedAtom';
import { toastSignal } from '../atoms/toastSignal';

import { translationBootstrap } from '@/trans/sagas/translationBootstrap';
import { userBootstrap } from '@/user/sagas/userBootstrap';

/**
 * where to put all app bootstrapping logic
 */
const bootstrap = () => {
  // console.log('bootstrap');

  spawn(async ({ onError, all, set }) => {
    // handle unexpected error that throws by descendant tasks
    onError((error: Error) => {
      toastSignal({ type: 'error', description: error.message });
    });

    // wait until all feature bootstraped
    await all({ userBootstrap, translationBootstrap });

    await set(bootstrapedAtom, true);
  });
};

export { bootstrap };
