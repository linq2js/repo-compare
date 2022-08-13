import { HttpDriver } from 'rativ/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let RNFetchBlob: any;

const rnFetchBlob: HttpDriver = (options) => {
  const task = RNFetchBlob.fetch(options.method, options.url, options.headers, options.body);
  if (options.abortController) {
    Object.assign(options.abortController, {
      abort() {
        task.cancel();
      },
    });
  }

  return task;
};

export { rnFetchBlob };
