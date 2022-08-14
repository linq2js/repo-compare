import AsyncStorage from '@react-native-async-storage/async-storage';
import { SC } from 'rativ/saga';

import { PERSISTENCE_KEY } from '../configs';
import { naviationStateChangeSignal } from '../signals/navigationStateChangeSignal';

const navigationSideEffects = ({ debounce }: SC) => {
  debounce(500, naviationStateChangeSignal, (state) => {
    AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
  });
};

export { navigationSideEffects };
