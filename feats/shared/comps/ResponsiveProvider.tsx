import { useMediaQuery } from 'native-base';
import { atom, keyOf } from 'rativ';

import { memo, useLayoutEffect, useRef } from 'react';

import { mediaQueries } from '../configs';
import { MediaQuries as MediaQueries } from '../types';

const keys = keyOf(mediaQueries);
const queries = Object.values(mediaQueries);

const matchQueriesAtom = atom<MediaQueries[]>([]);

const ResponsiveProvider = memo(() => {
  const firstRenderRef = useRef(true);
  const results = useMediaQuery(queries) as boolean[];
  const selectedQueries: MediaQueries[] = [];
  results.forEach((value, index) => {
    if (value) {
      selectedQueries.push(keys[index]);
    }
  });

  if (firstRenderRef.current) {
    firstRenderRef.current = false;
    matchQueriesAtom.set(selectedQueries);
  }

  useLayoutEffect(() => {
    matchQueriesAtom.set(selectedQueries);
  }, [selectedQueries.join('|')]);

  return null;
});

export { ResponsiveProvider, matchQueriesAtom };
