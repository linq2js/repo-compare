import { Button } from 'native-base';

import { PropsOf } from '../types';

const PrimaryButton = (props: PropsOf<typeof Button>) => <Button {...props} colorScheme="blue" />;

export { PrimaryButton };
