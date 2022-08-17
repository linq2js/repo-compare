import AsyncStorage from '@react-native-async-storage/async-storage';
import { SC } from 'rativ/saga';

import { naviationStateChangeSignal } from '../signals/navigationStateChangeSignal';

import { PERSISTENCE_KEY } from '@/configs/navigation';

const handleNavigationStateChange = (_: SC, state: unknown) => {
  // console.log('navigation', state);
  AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
};

const navigationSideEffects = ({ debounce }: SC) => {
  debounce(500, naviationStateChangeSignal, handleNavigationStateChange);
};

export { navigationSideEffects };
