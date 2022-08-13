import { throws } from 'rativ';
import { SC } from 'rativ/saga';

import { repoTypeAtom } from '../atoms/repoTypeAtom';
import { emptySearchResult, searchRepoResultAtom } from '../atoms/searchRepoResultAtom';
import { searchTermAtom } from '../atoms/searchTermAtom';
import { toastAtom } from '../atoms/toastAtom';
import { cancelSearchingSignal } from '../signals/cancelSearchingSignal';

import { searchRepoSaga as githubSearchRepoSaga } from '@/repo/github/sagas';

const searchRepoSaga = ({ debounce }: SC) => {
  // listen searchTermAtom changed and debouce execution in 300ms
  debounce(0, searchTermAtom, onSearchTermChangedSaga);
};

const onSearchTermChangedSaga = async ({ race }: SC) => {
  // start racing of startSearchingSaga and cancelSearchingSignal, when the first one wins, cancel the others
  await race({
    startSearchingSaga,
    cancelSearchingSignal,
  });
};

const startSearchingSaga = async ({ call, set }: SC) => {
  const repoName = searchTermAtom();

  try {
    // no repo name is present
    if (!repoName) {
      set(searchRepoResultAtom, emptySearchResult);
      return;
    }

    const searchSaga =
      repoTypeAtom() === 'github'
        ? githubSearchRepoSaga
        : throws(`Unsupported repo type: ${repoTypeAtom()}`);

    const result = call(searchSaga, { name: repoName, count: 10 });
    await set(searchRepoResultAtom, result);
  } catch (ex) {
    // show toast
    toastAtom.set({
      type: 'error',
      title: 'Search Repo Error',
      description: (ex as Error).message,
    });
  }
};

export { searchRepoSaga };
