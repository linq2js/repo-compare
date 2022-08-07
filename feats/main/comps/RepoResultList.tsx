import { VStack } from 'native-base';
import { stable } from 'rativ/react';

import { searchRepoResultAtom } from '../atoms/searchRepoResultAtom';
import { RepoResult } from './RepoResult';

const RepoResultList = stable(() => {
  /* stable part */
  return () => {
    /* unstable part */
    return (
      <VStack space="md">
        {searchRepoResultAtom().items.map((repo) => (
          <RepoResult key={repo.fullName} repo={repo} />
        ))}
      </VStack>
    );
  };
});

export { RepoResultList };
