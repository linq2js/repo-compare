import { VStack } from 'native-base';
import { slot } from 'rativ/react';

import { searchRepoResultAtom } from '../atoms/searchRepoResultAtom';
import { RepoResult } from './RepoResult';

const RepoResultList = () => (
  <VStack space="md">
    {slot(() =>
      searchRepoResultAtom().items.map((repo) => <RepoResult key={repo.key} repo={repo} />),
    )}
  </VStack>
);

export { RepoResultList };
