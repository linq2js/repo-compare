import { atom } from 'rativ';

import { RepoType } from '@/types';

const repoTypeAtom = atom<RepoType>('github');

export { repoTypeAtom };
