import { Box, Heading, Text } from 'native-base';
import { stable } from 'rativ/react';

import { PropsOf, ToastInfo } from '../../types';

const Toast = stable((props: ToastInfo) => {
  const backColor: PropsOf<typeof Box>['bg'] = props.type === 'error' ? 'red.500' : 'blue.500';
  const textColor: PropsOf<typeof Text>['color'] = 'white';

  return (
    <Box bg={backColor} px={4} py={2} rounded="sm">
      {props.title && (
        <Heading color={textColor} size="sm">
          {props.title}
        </Heading>
      )}
      {props.description && <Text color={textColor}>{props.description}</Text>}
    </Box>
  );
});

export { Toast };
