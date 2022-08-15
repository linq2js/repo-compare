import { useToast } from 'native-base';
import { stable } from 'rativ/react';

import { Toast } from './Toast';

import { toastSignal } from '@/main/signals/toastSignal';

const ToastProvider = stable(() => {
  let toast: ReturnType<typeof useToast> | undefined;

  toastSignal.on((info) => {
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
