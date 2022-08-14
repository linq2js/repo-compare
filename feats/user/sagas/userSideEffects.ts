import { SC } from 'rativ/saga';

import { userApi } from '../api/userApi';
import { userProfileAtom } from '../atoms/userProfileAtom';
import { loginSignal } from '../signals/loginSignal';
import { logoutSignal } from '../signals/logoutSignal';

import { toastSignal } from '@/main/atoms/toastSignal';

const userSideEffects = async ({ when, call, infinite, set }: SC) => {
  await infinite(async () => {
    try {
      const { username, password } = await when(loginSignal);
      const laodUserProfileResult = call(userApi.login, { username, password });
      await set(userProfileAtom, laodUserProfileResult);
      await when(logoutSignal);
      await set(userProfileAtom, undefined);
      // continue handling user login/logout login
    } catch (ex) {
      toastSignal({ type: 'error', description: (ex as Error).message });
    }
  });
};

export { userSideEffects };
