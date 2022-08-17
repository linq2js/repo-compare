import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'native-base';

import { NestedNavigator } from '../nav/navigator';

import { ColorModeSwitcher } from '@/shared/comps/ColorModeSwitcher';
import { ThemedBox } from '@/shared/comps/ThemedBox';
import { ThemedText } from '@/shared/comps/ThemedText';
import { createScreen } from '@/shared/helpers/createScreen';
import { ScreenProps } from '@/types';
import { UserNav } from '@/user/nav/navigator';

const Tab = createBottomTabNavigator<NestedNavigator>();

const Tab1Screen = createScreen(() => () => (
  <ThemedBox flex={1} p={4}>
    <ColorModeSwitcher />
    <Button onPress={() => UserNav('user_profile')}>Profile Screen</Button>
  </ThemedBox>
));

const Tab2Screen = createScreen((props: ScreenProps<NestedNavigator, 'tab2'>) => () => (
  <ThemedBox flex={1} p={4}>
    <ThemedText>{props.route.name}</ThemedText>
  </ThemedBox>
));

const HomeScreen = createScreen(() => (
  <Tab.Navigator>
    <Tab.Screen name="tab1" component={Tab1Screen} />
    <Tab.Screen name="tab2" component={Tab2Screen} />
  </Tab.Navigator>
));

export { HomeScreen };
