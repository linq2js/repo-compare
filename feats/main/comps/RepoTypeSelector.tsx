import { Select } from 'native-base';
import { stable } from 'rativ/react';

import { repoTypeAtom } from '../atoms/repoTypeAtom';

import { PropsOf, repoTypes } from '@/types';

export type Props = Omit<
  PropsOf<typeof Select>,
  'selectedValue' | 'onValueChange' | 'defaultValue'
>;

const RepoTypeSelector = stable((props: Props) => () => (
  <Select
    {...props}
    selectedValue={repoTypeAtom()}
    onValueChange={repoTypeAtom.set}
    defaultValue={repoTypeAtom()}
  >
    {repoTypes.map((type) => (
      <Select.Item key={type} label={type} value={type} />
    ))}
  </Select>
));

export { RepoTypeSelector };
