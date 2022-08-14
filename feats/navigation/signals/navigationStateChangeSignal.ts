import { NavigationState } from '@react-navigation/native';
import { signal } from 'rativ/saga';

const naviationStateChangeSignal = signal<Readonly<NavigationState>>();

export { naviationStateChangeSignal };
