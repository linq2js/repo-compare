// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPromiseLike = <T>(value: any): value is Promise<T> => {
  return value && typeof value.then === 'function';
};

export { isPromiseLike };
