import { useToast } from 'native-base';
import { stable } from 'rativ/react';

import { Toast } from './Toast';

import { toastAtom } from '@/main/atoms/toastAtom';

const ToastProvider = stable(() => {
  let toast: ReturnType<typeof useToast> | undefined;

  toastAtom.on((info) => {
    if (!info) return;

    toast?.show(info.render ? info : { ...info, render: () => <Toast {...info} /> });
  });

  /* stable part */
  return () => {
    toast = useToast();
    return null;
  };
});

export { ToastProvider };
