import { atom } from 'rativ';

/**
 * Boostraped status of the app. After app bootstraping, this atom must be assigned to `true`
 */
const bootstrapedAtom = atom(false);

export { bootstrapedAtom };
