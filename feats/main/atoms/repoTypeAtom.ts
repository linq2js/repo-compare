import { atom } from 'rativ';

import { RepoType } from '@/shared/types';

const repoTypeAtom = atom<RepoType>('github');

export { repoTypeAtom };
