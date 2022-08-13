import { signal } from 'rativ/saga';

import { ToastInfo } from '@/types';

const toastSignal = signal<ToastInfo>();

export { toastSignal };
