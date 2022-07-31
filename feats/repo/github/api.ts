import { Configs, define } from 'apiiz';
import { rest } from 'apiiz/rest';
import { pipe, transformResult } from 'apiiz/transform';
import { RepoInfo } from 'feats/shared/types/RepoInfo';
import { SearchPayload } from 'feats/shared/types/SearchPayload';
import { SearchResult } from 'feats/shared/types/SearchResult';

import { GithubRawRepoInfo, GithubRawSearchRepoResult } from './types';

const toRepoInfo = (item: GithubRawRepoInfo): RepoInfo => ({
  type: 'github',
  name: item.name,
  fullName: item.full_name,
  url: item.html_url,
});

const toSearchRepoResult = async (
  result: GithubRawSearchRepoResult,
): Promise<SearchResult<RepoInfo>> => ({
  count: result.total_count,
  items: result.items.map(toRepoInfo),
});

const configs: Configs = {
  http: { baseUrl: process.env.PUBLIC_GITHUB_API_ENDPOINT },
};

const api = define({
  configs,
  search: pipe(
    rest<SearchPayload, GithubRawSearchRepoResult>('/search/repositories', {
      // build query string from payload
      query: ({ name }) => ({ q: name }),
    }),
    transformResult(toSearchRepoResult),
  ),
});

export { api };
