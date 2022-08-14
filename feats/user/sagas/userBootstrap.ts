import { Saga } from 'rativ/saga';

import { userSideEffects } from './userSideEffects';

const userBootstrap: Saga = ({ spawn }) => {
  // using spawn to execute the task with non-blocking mode
  spawn(({ fork }) => {
    fork(userSideEffects);
  });
};

export { userBootstrap };
