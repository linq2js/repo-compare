import { SC } from 'rativ/saga';

import { api } from './api';

import { RepoInfo, RepoType, SearchResult, SearchPayload } from '@/types';

const searchRepoSaga = async (
  { call }: SC,
  { count, excludes, name }: SearchPayload,
): Promise<SearchResult<RepoInfo>> => {
  let total = 0;
  const items: RepoInfo[] = [];
  const type: RepoType = 'github';
  let page = 1;

  // continue calling search API until desired items are filled

  while (items.length < count) {
    const pageSize = Math.min(10, count - items.length);
    const result = await call(api.search, {
      per_page: pageSize,
      q: name,
      page,
    });

    // exclude some results if payload.exclude is present
    const filteredItems = excludes
      ? result.items.filter((x) => {
          const fullName = `github:${x.full_name}`;
          if (excludes?.includes(fullName)) return false;
          return true;
        })
      : result.items;

    // no more item
    if (!filteredItems.length) break;
    total += filteredItems.length;
    items.push(
      ...filteredItems.map((x) => ({
        type,
        key: `github:${x.full_name}`,
        fullName: x.full_name,
        name: x.name,
        description: x.description,
        url: x.html_url,
      })),
    );
    page++;
  }

  return { total, items };
};

export { searchRepoSaga };
