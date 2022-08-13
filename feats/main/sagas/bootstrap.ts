import { spawn } from 'rativ/saga';

import { toastSignal } from '../atoms/toastSignal';

import { initTranslation } from '@/trans';
import { userBootstrap } from '@/user/sagas/userBootstrap';

/**
 * where to put all app bootstrapping logic
 */
const bootstrap = () => {
  // console.log('bootstrap');

  initTranslation();

  spawn(({ onError, call }) => {
    onError((error: Error) => {
      toastSignal({ type: 'error', description: error.message });
    });

    call(userBootstrap);
  });
};

export { bootstrap };
