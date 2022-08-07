import { spawn } from 'rativ/saga';

import { searchRepoSaga } from './searchRepoSaga';

import { initTranslation } from '@/trans';

/**
 * where to put all app bootstrapping logic
 */
const bootstrap = () => {
  console.log('bootstrap');

  initTranslation();

  spawn(({ fork }) => {
    fork(searchRepoSaga);
  });
};

export { bootstrap };
