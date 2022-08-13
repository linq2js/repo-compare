import { stable } from 'rativ/react';

import { ModalButtonProps } from '../helpers/createModal';
import { sharedTrans } from '../hooks/translator';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

const CancelButton = stable((props: ModalButtonProps) =>
  sharedTrans('common', (T) => (
    <SecondaryButton onPress={props.onPress}>{T('cancel')}</SecondaryButton>
  )),
);

const OkButton = stable((props: ModalButtonProps) =>
  sharedTrans('common', (T) => <PrimaryButton onPress={props.onPress}>{T('ok')}</PrimaryButton>),
);

const OkCancel = {
  cancel: CancelButton,
  ok: OkButton,
};

export { OkCancel };
