import { define, Configs } from 'rativ/api';
import { rest } from 'rativ/rest';

import { GithubRawSearchRepoResult, GithubSearchPayload } from './types';

const configs: Configs = {
  http: { baseUrl: process.env.PUBLIC_GITHUB_API_ENDPOINT },
};
// https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting
const search = rest<GithubSearchPayload, GithubRawSearchRepoResult>('/search/repositories', {
  convertPayloadTo: 'query',
});

const api = define({ configs, search });

export { api };
