import { LinkingOptions, ParamListBase } from '@react-navigation/native';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const LINKING_OPTIONS: LinkingOptions<ParamListBase> = {
  prefixes: ['myapp://', 'https://myapp.com'],
};

export { PERSISTENCE_KEY, LINKING_OPTIONS };
