import AsyncStorage from '@react-native-async-storage/async-storage';
import { SC } from 'rativ/saga';

import { Linking, Platform } from 'react-native';

import { navigationStateAtom } from '../atoms/navigationStateAtom';
import { PERSISTENCE_KEY } from '../configs';
import { navigationSideEffects } from './navigationSideEffects';

const navigationBoostrap = async ({ spawn, set }: SC) => {
  const initialUrl = await Linking.getInitialURL();

  if (Platform.OS !== 'web' && initialUrl) {
    // Only restore state if there's no deep link and we're not on web
    const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
    const state = savedStateString ? JSON.parse(savedStateString) : undefined;

    if (state) {
      await set(navigationStateAtom, state);
    }
  }

  spawn(navigationSideEffects);
};

export { navigationBoostrap };
