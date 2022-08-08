import { NativeBaseProvider } from 'native-base';

import { themeConfigs } from '@/configs/theme';
import { bootstrap } from '@/main/sagas/bootstrap';
import { HomeScreen } from '@/main/screens/HomeScreen';
import { ResponsiveProvider } from '@/shared/comps/ResponsiveProvider';
import { ToastProvider } from '@/shared/comps/ToastProvider';

bootstrap();

export default function App() {
  return (
    <NativeBaseProvider theme={themeConfigs}>
      <HomeScreen />
      <ResponsiveProvider />
      <ToastProvider />
    </NativeBaseProvider>
  );
}
