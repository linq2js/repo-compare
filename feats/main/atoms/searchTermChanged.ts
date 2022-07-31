import { signal } from 'rativ/flow';

const searchTermChanged = signal<string>();

export { searchTermChanged };
