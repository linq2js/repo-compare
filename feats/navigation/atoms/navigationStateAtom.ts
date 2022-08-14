import { NavigationState } from '@react-navigation/native';
import { atom } from 'rativ';

const navigationStateAtom = atom<Readonly<NavigationState> | undefined>(undefined);

export { navigationStateAtom };
