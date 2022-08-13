import { define } from 'rativ/api';
import { memory } from 'rativ/memory';

import { LoginPayload, User } from '../types';

const login = memory<LoginPayload, User>(async ({ delay }, { username, password }) => {
  await delay(2000);
  if (password !== '123456') {
    throw new Error('Invalid username or password');
  }
  return { id: 1, username };
});

const userApi = define({
  login,
});

export { userApi };
