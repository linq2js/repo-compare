import { Box, Text } from 'native-base';
import { $, stable } from 'rativ';

import { searchRepoResult } from '@/main/atoms/searchRepoResult';

const AddRepoModal = stable(() => {
  return (
    <Box>
      {$(() => {
        const { count, items } = searchRepoResult.state;
        if (!count) {
          return <Text>No result</Text>;
        }
        return items.map((repo) => (
          <Box key={repo.url}>
            <Text>{repo.fullName}</Text>
          </Box>
        ));
      })}
    </Box>
  );
});

export { AddRepoModal };
