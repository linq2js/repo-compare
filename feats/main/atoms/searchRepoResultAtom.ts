import { atom } from 'rativ';

import { RepoInfo, SearchResult } from '@/types';

const emptySearchResult: SearchResult<RepoInfo> = { total: 0, items: [] };

const searchRepoResultAtom = atom(emptySearchResult);

export { searchRepoResultAtom, emptySearchResult };
