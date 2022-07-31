import { RepoType } from './RepoType';

export type RepoInfo = {
  type: RepoType;
  name: string;
  fullName: string;
  url: string;
};
