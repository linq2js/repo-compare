import { Button } from 'native-base';

import { PropsOf } from '../../types';

const SecondaryButton = (props: PropsOf<typeof Button>) => (
  <Button {...props} variant="ghost" colorScheme="secondary" />
);

export { SecondaryButton };
