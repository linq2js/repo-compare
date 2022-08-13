import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { themeConfigs } from '@/configs/theme';
import { MainNav } from '@/main/navigator';
import { bootstrap } from '@/main/sagas/bootstrap';
import { FatalErrorScreen } from '@/main/screens/FatalErrorScreen';
import { LoadingScreen } from '@/main/screens/LoadingScreen';
import { RootNavigator } from '@/navigation/comps/RootNavigator';
import { ResponsiveProvider } from '@/shared/comps/ResponsiveProvider';
import { ToastProvider } from '@/shared/comps/ToastProvider';
import { UserNav } from '@/user/navigator';

bootstrap();

export default function App() {
  return (
    <NativeBaseProvider theme={themeConfigs}>
      <NavigationContainer>
        <RootNavigator
          navigators={[MainNav, UserNav]}
          screenOptions={{ animation: 'slide_from_bottom' }}
          loadingRenderer={({ Screen }) => (
            <Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
          )}
          errorRenderer={({ Screen }) => (
            <Screen
              name="fatal_error"
              component={FatalErrorScreen}
              options={{ headerShown: false }}
            />
          )}
        />
      </NavigationContainer>

      <ResponsiveProvider />
      <ToastProvider />
    </NativeBaseProvider>
  );
}
