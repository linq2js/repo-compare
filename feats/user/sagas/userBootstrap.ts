import { Saga } from 'rativ/saga';

import { userSideEffects } from './userSideEffects';

const userBootstrap: Saga = ({ fork }) => {
  // do something
  fork(userSideEffects);
};

export { userBootstrap };
