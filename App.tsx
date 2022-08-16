import { NativeBaseProvider } from 'native-base';
import { stable } from 'rativ/dist/tsc/react';

import { themeConfigs } from '@/configs/theme';
import { bootstrapedAtom } from '@/main/atoms/bootstrapedAtom';
import { MainNav } from '@/main/navigator';
import { bootstrap } from '@/main/sagas/bootstrap';
import { BootstrapingScreen } from '@/main/screens/BootstrapingScreen';
import { NavigationContainer } from '@/navigation/comps/NavigationContainer';
import { RootNavigator } from '@/navigation/comps/RootNavigator';
import { ResponsiveProvider } from '@/shared/comps/ResponsiveProvider';
import { ToastProvider } from '@/shared/comps/ToastProvider';
import { FatalErrorScreen } from '@/shared/screens/FatalErrorScreen';
import { LoadingScreen } from '@/shared/screens/LoadingScreen';
import { UserNav } from '@/user/navigator';

const App = stable(() => {
  bootstrap();

  return () => {
    const navigator = bootstrapedAtom() ? (
      <NavigationContainer>
        <RootNavigator
          navigators={[MainNav, UserNav]}
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
    ) : (
      <BootstrapingScreen />
    );

    return (
      <NativeBaseProvider theme={themeConfigs}>
        {navigator}
        <ResponsiveProvider />
        <ToastProvider />
      </NativeBaseProvider>
    );
  };
});

export default App;
