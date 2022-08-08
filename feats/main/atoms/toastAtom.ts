import { atom } from 'rativ';

import { ToastInfo } from '@/types';

const toastAtom = atom<ToastInfo | undefined>(undefined);

export { toastAtom };
