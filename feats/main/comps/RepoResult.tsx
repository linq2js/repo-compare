import * as Linking from 'expo-linking';
import { Heading, HStack, Pressable, Skeleton, Text, VStack } from 'native-base';
import { stable } from 'rativ/react';

import { Platform } from 'react-native';

import { PrimaryButton } from '@/shared/comps/PrimaryButton';
import { RepoInfo } from '@/types';

export type Props = { repo: RepoInfo };

const openLink =
  typeof window !== 'undefined' && Platform.OS === 'web'
    ? // eslint-disable-next-line no-undef
      (url: string) => window.open(url, '_blank')
    : Linking.openURL;

const RepoResult = stable((props: Props) => {
  /* stable part */
  return (
    <HStack alignItems="start" space="sm">
      <VStack flex={1}>
        <Pressable onPress={() => openLink(props.repo.url)}>
          <Heading size="sm">
            <Text numberOfLines={1} ellipsizeMode="middle">
              {props.repo.fullName}
            </Text>
          </Heading>
        </Pressable>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {props.repo.description}
        </Text>
      </VStack>
      <PrimaryButton size="sm">Add</PrimaryButton>
    </HStack>
  );
});

/**
 * the component's skeleton must be in the same file as the component
 */
const RepoResultSkeleton = stable((props: { count: number }) => {
  /* stable part */
  return (
    <VStack space="md">
      {new Array(props.count).fill(null).map((_, i) => (
        <Skeleton.Text key={i} />
      ))}
    </VStack>
  );
});

export { RepoResult, RepoResultSkeleton };
