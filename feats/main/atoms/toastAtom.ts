import { atom } from 'rativ';

import { ToastInfo } from '@/shared/types';

const toastAtom = atom<ToastInfo | undefined>(undefined);

export { toastAtom };
