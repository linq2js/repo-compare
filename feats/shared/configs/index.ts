import { defineMediaQueries } from '../helpers/defineMediaQueries';

// mobile first media queries
const mediaQueries = defineMediaQueries({
  '2xl': { minWidth: 1536 },
  xl: { minWidth: 1280 },
  lg: { minWidth: 1024 },
  md: { minWidth: 768 },
  sm: { minWidth: 640 },
});

export { mediaQueries };
