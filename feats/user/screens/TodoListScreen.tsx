import { Text } from 'native-base';
import { atom, delay } from 'rativ';
import { stable } from 'rativ/react';

import { Suspense, useEffect } from 'react';

import { createScreen } from '@/shared/helpers/createScreen';

const todoListAtom1 = atom<number[]>([]);
const todoListAtom2 = atom<number[]>([]);

const TodoListImpl = stable(
  (props: { data: number[]; delayTime: number; isFirst: boolean }) => () => {
    const a = props.isFirst ? todoListAtom1 : todoListAtom2;
    useEffect(() => {
      const promise = delay(props.delayTime).then(() => props.data);
      a.set(promise);
    }, []);
    const todos = a();
    return <Text>{todos.join(',')}</Text>;
  },
);

const TodoListScreen = createScreen(() => (
  <>
    <Suspense fallback={<Text>Atom 1 loading...</Text>}>
      <TodoListImpl data={[1, 2, 3]} delayTime={2000} isFirst={true} />
    </Suspense>
    <Suspense fallback={<Text>Atom 2 loading...</Text>}>
      <TodoListImpl data={[4, 5, 6]} delayTime={4000} isFirst={false} />
    </Suspense>
  </>
));

export { TodoListScreen };
