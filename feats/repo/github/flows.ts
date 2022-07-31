import { SearchPayload } from 'feats/shared/types/SearchPayload';
import { FlowContext } from 'rativ/flow';

import { api } from './api';

export const searchRepo = (_: FlowContext, payload: SearchPayload) => {
  return api.search(payload);
};
