import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'native-base';
import { stable } from 'rativ/react';

import { ColorModeSwitcher } from '@/shared/comps/ColorModeSwitcher';
import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';
import { ScreenProps } from '@/types';
import { UserNav } from '@/user/navigator';

/**
 * define nested screen
 */
export type NestedNavigator = {
  tab1: { number: 1 };
  tab2: undefined;
};

const Tab = createBottomTabNavigator<NestedNavigator>();

const Tab1Screen = stable(() => () => (
  <ThemedBox flex={1} p={4}>
    <ColorModeSwitcher />
    <Button onPress={() => UserNav('profile')}>Profile Screen</Button>
  </ThemedBox>
));

const Tab2Screen = stable((props: ScreenProps<NestedNavigator, 'tab2'>) => () => (
  <ThemedBox flex={1} p={4}>
    <ThemedText>{props.route.name}</ThemedText>
  </ThemedBox>
));

const HomeScreen = stable(() => (
  <Tab.Navigator>
    <Tab.Screen name="tab1" component={Tab1Screen} />
    <Tab.Screen name="tab2" component={Tab2Screen} />
  </Tab.Navigator>
));

export { HomeScreen };
