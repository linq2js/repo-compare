import AsyncStorage from '@react-native-async-storage/async-storage';
import { SC } from 'rativ/saga';

import { userApi } from '../api/userApi';
import { anonymousUser, userProfileAtom } from '../atoms/userProfileAtom';
import { loginSignal } from '../signals/loginSignal';
import { logoutSignal } from '../signals/logoutSignal';

import { ACCESS_TOKEN_STORAGE_KEY } from '@/configs/user';
import { toastSignal } from '@/main/signals/toastSignal';

const handleUserLogin = async ({ when, call, infinite, set }: SC) => {
  await infinite(async () => {
    try {
      const isAnonymous = userProfileAtom().role === 'anonymous';
      // only listen loginSignal when current user is anonymous
      if (isAnonymous) {
        const { username, password } = await when(loginSignal);
        const laodUserProfileResult = call(userApi.login, { username, password });
        await set(userProfileAtom, laodUserProfileResult);
        await AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, userProfileAtom().accessToken ?? '');
      }
      await when(logoutSignal);
      await AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      await set(userProfileAtom, anonymousUser);
      // continue handling user login/logout login
    } catch (ex) {
      toastSignal({ type: 'error', description: (ex as Error).message });
    }
  });
};

const userSideEffects = async ({ fork }: SC) => {
  fork(handleUserLogin);
};

export { userSideEffects };
