import { Query } from '../../types';

const defineMediaQueries = <T extends Record<string, Query>>(mediaQueries: T) => mediaQueries;

export { defineMediaQueries };
