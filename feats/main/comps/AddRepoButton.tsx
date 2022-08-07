import { Fab, Icon } from 'native-base';
import { stable } from 'rativ/react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { mainTrans } from '../hooks/translation';
import { SearchRepoModal } from '../modals/SearchRepoModal';

const AddRepoButton = stable(() => {
  // create a modal instance
  const modal = SearchRepoModal();

  return (
    <>
      {modal.render({ isOpen: false })}
      {mainTrans('AddRepoButton', (T) => (
        <Fab
          py={2}
          px={4}
          colorScheme="blue"
          icon={<Icon color="white" as={Ionicons} name="add-outline" size="md" />}
          label={T('text')}
          onPress={modal.show}
        />
      ))}
    </>
  );
});

export { AddRepoButton };
