import AsyncStorage from '@react-native-async-storage/async-storage';
import { SC } from 'rativ/saga';

import { userApi } from '../api/userApi';
import { userProfileAtom } from '../atoms/userProfileAtom';
import { userSideEffects } from './userSideEffects';

import { ACCESS_TOKEN_STORAGE_KEY } from '@/configs/user';

const userBootstrap = async ({ spawn, call, set, when }: SC) => {
  const accessToken = await when(AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));
  if (accessToken) {
    // load user by token
    const user = await call(userApi.loadProfile, accessToken);
    await set(userProfileAtom, user);
  }

  // using spawn to execute the task with non-blocking mode
  spawn(({ fork }) => {
    fork(userSideEffects);
  });
};

export { userBootstrap };
