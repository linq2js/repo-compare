import { define, Configs } from 'rativ/api';
import { rest } from 'rativ/rest';

import { GithubRawSearchRepoResult, GithubSearchPayload } from './types';

const configs: Configs = {
  http: { baseUrl: process.env.PUBLIC_GITHUB_API_ENDPOINT },
};

const api = define({
  configs,
  search: rest<GithubSearchPayload, GithubRawSearchRepoResult>('/search/repositories', {
    convertPayloadTo: 'query',
  }),
});

export { api };
