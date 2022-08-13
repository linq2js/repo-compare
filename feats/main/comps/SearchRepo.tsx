import Ionicons from '@expo/vector-icons/Ionicons';
import { HStack, Icon, Input, ScrollView, VStack } from 'native-base';
import { stable } from 'rativ/react';

import { Suspense } from 'react';

import { searchTermAtom } from '../atoms/searchTermAtom';
import { RepoResultSkeleton } from './RepoResult';
import { RepoResultList } from './RepoResultList';
import { RepoTypeSelector } from './RepoTypeSelector';

const SearchRepo = stable(() => {
  /* stable part */
  return (
    <>
      <VStack space="md" flex={1}>
        <HStack space="sm">
          <Input
            onChangeText={searchTermAtom.set}
            InputLeftElement={<Icon as={Ionicons} name="search" size={5} ml={2} />}
            flex={1}
          />
          <RepoTypeSelector w={24} />
        </HStack>
        <ScrollView flex={1}>
          <Suspense fallback={<RepoResultSkeleton count={10} />}>
            <RepoResultList />
          </Suspense>
        </ScrollView>
      </VStack>
    </>
  );
});

export { SearchRepo };
