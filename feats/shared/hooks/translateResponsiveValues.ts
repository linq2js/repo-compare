import { matchQueriesAtom } from '../comps/ResponsiveProvider';
import { ResponsiveValue } from '../types';

export type GetResponsiveValues = {
  <T1>(value1: T1 | ResponsiveValue<T1>): [T1];
  <T1, T2>(value1: T1 | ResponsiveValue<T1>, value2: T2 | ResponsiveValue<T2>): [T1, T2];
  <T1, T2, T3>(
    value1: T1 | ResponsiveValue<T1>,
    value2: T2 | ResponsiveValue<T2>,
    value3: T3 | ResponsiveValue<T3>,
  ): [T1, T2, T3];
  <T1, T2, T3, T4>(
    value1: T1 | ResponsiveValue<T1>,
    value2: T2 | ResponsiveValue<T2>,
    value3: T3 | ResponsiveValue<T3>,
    value4: T4 | ResponsiveValue<T4>,
  ): [T1, T2, T3, T4];
  <T1, T2, T3, T4, T5>(
    value1: T1 | ResponsiveValue<T1>,
    value2: T2 | ResponsiveValue<T2>,
    value3: T3 | ResponsiveValue<T3>,
    value4: T4 | ResponsiveValue<T4>,
    value5: T5 | ResponsiveValue<T5>,
  ): [T1, T2, T3, T4, T5];
  <T1, T2, T3, T4, T5, T6>(
    value1: T1 | ResponsiveValue<T1>,
    value2: T2 | ResponsiveValue<T2>,
    value3: T3 | ResponsiveValue<T3>,
    value4: T4 | ResponsiveValue<T4>,
    value5: T5 | ResponsiveValue<T5>,
    value6: T6 | ResponsiveValue<T6>,
  ): [T1, T2, T3, T4, T5, T6];
  <T1, T2, T3, T4, T5, T6, T7>(
    value1: T1 | ResponsiveValue<T1>,
    value2: T2 | ResponsiveValue<T2>,
    value3: T3 | ResponsiveValue<T3>,
    value4: T4 | ResponsiveValue<T4>,
    value5: T5 | ResponsiveValue<T5>,
    value6: T6 | ResponsiveValue<T6>,
    value7: T7 | ResponsiveValue<T7>,
  ): [T1, T2, T3, T4, T5, T6, T7];
  <T1, T2, T3, T4, T5, T6, T7, T8>(
    value1: T1 | ResponsiveValue<T1>,
    value2: T2 | ResponsiveValue<T2>,
    value3: T3 | ResponsiveValue<T3>,
    value4: T4 | ResponsiveValue<T4>,
    value5: T5 | ResponsiveValue<T5>,
    value6: T6 | ResponsiveValue<T6>,
    value7: T7 | ResponsiveValue<T7>,
    value8: T8 | ResponsiveValue<T8>,
  ): [T1, T2, T3, T4, T5, T6, T7, T8];
  <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    value1: T1 | ResponsiveValue<T1>,
    value2: T2 | ResponsiveValue<T2>,
    value3: T3 | ResponsiveValue<T3>,
    value4: T4 | ResponsiveValue<T4>,
    value5: T5 | ResponsiveValue<T5>,
    value6: T6 | ResponsiveValue<T6>,
    value7: T7 | ResponsiveValue<T7>,
    value8: T8 | ResponsiveValue<T8>,
    value9: T9 | ResponsiveValue<T9>,
  ): [T1, T2, T3, T4, T5, T6, T7, T8, T9];
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T0>(
    value1: T1 | ResponsiveValue<T1>,
    value2: T2 | ResponsiveValue<T2>,
    value3: T3 | ResponsiveValue<T3>,
    value4: T4 | ResponsiveValue<T4>,
    value5: T5 | ResponsiveValue<T5>,
    value6: T6 | ResponsiveValue<T6>,
    value7: T7 | ResponsiveValue<T7>,
    value8: T8 | ResponsiveValue<T8>,
    value9: T9 | ResponsiveValue<T9>,
    value0: T0 | ResponsiveValue<T0>,
  ): [T1, T2, T3, T4, T5, T6, T7, T8, T9, T0];
};

const isResponsiveData = <T>(value: unknown): value is ResponsiveValue<T> => {
  return value !== null && !!value && !!(value as ResponsiveValue<T>).responsiveData;
};

const translateResponsiveValues = ((
  ...responsiveValues: (ResponsiveValue<unknown> | unknown)[]
) => {
  const matchQueries = matchQueriesAtom();
  return responsiveValues.map((rv) => {
    if (isResponsiveData(rv)) {
      const matchKey = matchQueries.find((key) => key in rv.responsiveData);
      if (!matchKey) return rv.responsiveData.fallback;
      return rv.responsiveData[matchKey];
    }
    return rv;
  });
}) as GetResponsiveValues;

export { translateResponsiveValues };
