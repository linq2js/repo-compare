import { createNavigator } from '@/nav/helpers/createnavigator';
import { ScreenParams } from '@/types';

type Params = {
  home: undefined | ScreenParams<NestedNavigator>;
};

export type NestedNavigator = {
  tab1: { number: 1 };
  tab2: undefined;
};

const MainNav = createNavigator<Params>();

export { MainNav };
