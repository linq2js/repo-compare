/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoInfer } from 'rativ';

import { ResponsiveData, ResponsiveValue } from '../types';

export type CreateResponsivValue = {
  <T>(responsiveData: ResponsiveData<NoInfer<T>>): ResponsiveValue<T>;
  <T, D extends NoInfer<Partial<T>>>(
    responsiveData: ResponsiveData<NoInfer<T>>,
    defaultValue: D,
  ): ResponsiveValue<T>;
};

const createResponsiveValue: CreateResponsivValue = (responsiveData: any, defaultValue?: any) => {
  if (typeof defaultValue !== 'undefined') {
    return {
      responsiveData: Object.fromEntries(
        Object.entries(responsiveData).map((x: any) => [x[0], { ...defaultValue, ...x[1] }]),
      ),
    };
  }
  return { responsiveData };
};

export { createResponsiveValue as RV };
