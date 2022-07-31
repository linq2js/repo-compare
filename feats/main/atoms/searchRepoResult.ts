import { atom } from 'rativ';

import { RepoInfo } from '@/types/RepoInfo';
import { SearchResult } from '@/types/SearchResult';

const initialState: SearchResult<RepoInfo> = { count: 0, items: [] };
const searchRepoResult = atom(initialState);

export { searchRepoResult };
