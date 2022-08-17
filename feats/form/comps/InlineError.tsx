import { Text } from 'native-base';
import { stable } from 'rativ/dist/tsc/react';

import { ReactNode } from 'react';

export type Props = {
  message: ReactNode;
};

const InlineError = stable((props: Props) => () => <Text color="danger.500">{props.message}</Text>);

export { InlineError };
