import { SC } from 'rativ/saga';

import { userSideEffects } from './userSideEffects';

const userBootstrap = ({ spawn }: SC) => {
  // using spawn to execute the task with non-blocking mode
  spawn(({ fork }) => {
    fork(userSideEffects);
  });
};

export { userBootstrap };
