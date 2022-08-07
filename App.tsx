import { NativeBaseProvider } from 'native-base';

import { FC } from 'react';
import { SafeAreaView } from 'react-native';

import { bootstrap } from '@/main/sagas/bootstrap';
import { HomeScreen } from '@/main/screens/HomeScreen';
import { ResponsiveProvider } from '@/shared/comps/ResponsiveProvider';
import { ToastProvider } from '@/shared/comps/ToastProvider';

bootstrap();

const FixSafeAreaView = SafeAreaView as unknown as FC;

export default function App() {
  return (
    <NativeBaseProvider>
      <FixSafeAreaView>
        <HomeScreen />
      </FixSafeAreaView>
      <ResponsiveProvider />
      <ToastProvider />
    </NativeBaseProvider>
  );
}
