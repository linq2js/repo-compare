import { define } from 'rativ/api';
import { memory } from 'rativ/memory';

import { LoginPayload, User } from '../types';

const createUserModel = (username: string, password: string) => {
  return {
    id: username.length,
    username,
    role: username === 'admin' ? 'admin' : 'normal',
    accessToken: JSON.stringify({ username, password }),
  } as User;
};

/**
 * create an API that runs memory
 */
const login = memory(async ({ delay }, { username, password }: LoginPayload) => {
  await delay(2000);
  if (password !== '123456') {
    throw new Error('Invalid username or password');
  }
  return createUserModel(username, password);
});

const loadProfile = memory(async ({ delay }, accessToken: string) => {
  await delay(2000);
  const { username, password } = JSON.parse(accessToken) as LoginPayload;
  return createUserModel(username, password);
});

const userApi = define({
  login,
  loadProfile,
});

export { userApi };
