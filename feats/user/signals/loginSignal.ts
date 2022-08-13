import { signal } from 'rativ/saga';

import { LoginPayload } from '../types';

const loginSignal = signal<LoginPayload>();

export { loginSignal };
