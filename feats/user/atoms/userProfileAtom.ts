import { atom } from 'rativ';

import { User } from '../types';

const guestUser: User = { id: 0, username: 'guest', role: 'guest' };

const anonymousUser: User = { id: 0, username: 'anonymous', role: 'anonymous' };

const userProfileAtom = atom<User>(anonymousUser);

export { userProfileAtom, guestUser, anonymousUser };
