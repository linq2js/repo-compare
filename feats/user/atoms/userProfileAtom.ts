import { atom } from 'rativ';

import { User } from '../types';

const userProfileAtom = atom<User | undefined>(undefined);

export { userProfileAtom };
