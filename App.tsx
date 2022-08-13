import { NativeBaseProvider } from 'native-base';

import { themeConfigs } from '@/configs/theme';
import { MainNavigator } from '@/main/navigator';
import { bootstrap } from '@/main/sagas/bootstrap';
import { ResponsiveProvider } from '@/shared/comps/ResponsiveProvider';
import { ToastProvider } from '@/shared/comps/ToastProvider';
import { RootNavigator } from '@/shared/helpers/navigator';

bootstrap();

export default function App() {
  return (
    <NativeBaseProvider theme={themeConfigs}>
      <RootNavigator navigators={[MainNavigator]} screenOptions={{ headerShown: false }} />
      <ResponsiveProvider />
      <ToastProvider />
    </NativeBaseProvider>
  );
}
