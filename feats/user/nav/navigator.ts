import { createNavigator } from '@/nav/helpers/createnavigator';

type Params = {
  login: undefined;
  user_profile: undefined;
  todo_list: undefined;
};

const UserNav = createNavigator<Params>();

export { UserNav };
