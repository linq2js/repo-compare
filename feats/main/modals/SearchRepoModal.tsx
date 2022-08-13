import { Heading } from 'native-base';

import { mainTrans } from '../hooks/translator';

import { SearchRepo } from '@/main/comps/SearchRepo';
import { OkCancel } from '@/shared/comps/OkCancel';
import { createModal } from '@/shared/helpers/createModal';

const SearchRepoModal = createModal(SearchRepo, {
  header: mainTrans('SearchRepoModal', (T) => <Heading fontSize="md">{T('heading')}</Heading>),
  contentProps: { h: 'full', w: 'full', m: 0 },
  bodyProps: { p: 4 },
  disableScrolling: true,
  buttons: OkCancel,
});

export { SearchRepoModal };
