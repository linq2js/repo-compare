import { Box, Button, Modal } from 'native-base';
import { atom, NoInfer } from 'rativ';
import { slot } from 'rativ/react';

import { createElement, FC, ReactNode } from 'react';

import { PropsOf, VoidFunction } from '../../types';

export type ModalBodyProps<R> = {
  isOpen: boolean;
  onClose: (result: R) => void;
};

export type ModalProps = {
  isOpen?: boolean;
};

export type Options = {
  header?: ReactNode;
  footer?: ReactNode;
  /**
   * if customParts = true, no Modal.Header and Modal.Footer are rendered, and all modal parts will render by the input component
   */
  customParts?: boolean;
  hideCloseButton?: boolean;
  /**
   * if disableScrolling = true, the modal will no render ScrollView which wraps modal body component
   */
  disableScrolling?: boolean;
  modalProps?: PropsOf<typeof Modal>;
  contentProps?: PropsOf<typeof Modal['Content']>;
  bodyProps?: PropsOf<typeof Modal['Body']>;
  footerProps?: PropsOf<typeof Modal['Footer']>;
  headerProps?: PropsOf<typeof Modal['Header']>;
};

export type ModalButtonProps = { onPress: VoidFunction };

export type ModalButtons = { [key: string]: FC<ModalButtonProps> };

export type OptionsWithButtons<B extends ModalButtons> = Options & { buttons: B };

export type ModalController<R> = {
  isOpen(): boolean;
  show(): Promise<R | undefined>;
  hide(result?: R): void;
};

export type IsEmptyObject<T> = [keyof T] extends [never] ? true : false;

export type ModalCreator<T, R> = {
  (): ModalController<R> & {
    render(props: T & ModalProps): ReactNode;
  };

  (defaultProps: T & ModalProps): ModalController<R> & {
    render(props?: Partial<T & ModalProps>): ReactNode;
  };
};

export type CreateModal = {
  /**
   * create a modal component that is based on the input component. The return value is modal creator
   * ```jsx
   * const MyModal = createModal(MyModalBody);
   *
   * const MyApp = stable(() => {
   *  const modal = MyModal(propsOfMyModalBody);
   *
   *  return <>
   *    {modal.render({})}
   *    <Button onPress={modal.show}>Show modal</Button>
   *  </>
   * })
   * ```
   */
  <T>(component: FC<T>, options?: Options): NoInfer<
    ModalCreator<T, T extends ModalBodyProps<infer R> ? R : void>
  >;

  /**
   * create a modal component that is based on the input component. The return value is modal creator
   * ```jsx
   * const MyModal = createModal(MyModalBody);
   *
   * const MyApp = stable(() => {
   *  const modal = MyModal(propsOfMyModalBody);
   *
   *  return <>
   *    {modal.render({})}
   *    <Button onPress={modal.show}>Show modal</Button>
   *  </>
   * })
   * ```
   */
  <B extends ModalButtons, T, R extends keyof B>(
    component: FC<T & ModalProps>,
    options: OptionsWithButtons<B>,
  ): NoInfer<ModalCreator<T, R>>;
};

const createModal: CreateModal = (
  Component: FC,
  {
    header,
    headerProps,
    customParts,
    hideCloseButton,
    bodyProps,
    contentProps,
    footer,
    footerProps,
    modalProps,
    disableScrolling,
    ...options
  }: Options = {},
): NoInfer<ModalCreator<unknown, unknown>> => {
  return (defaultProps?: ModalProps) => {
    let modalResolve: Function | undefined;
    const isOpen = atom<undefined | boolean>(undefined);
    const controller: ModalController<unknown> = {
      isOpen() {
        return isOpen() ?? defaultProps?.isOpen ?? false;
      },
      show() {
        return new Promise((resolve) => {
          modalResolve = resolve;
          isOpen.set(true);
        });
      },
      hide(result?: unknown) {
        modalResolve?.(result);
        isOpen.set(false);
      },
    };
    const closeWithoutResult = () => {
      controller.hide();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const render = (props: any) => {
      return slot(() => {
        const componentProps = {
          ...defaultProps,
          ...props,
          isOpen: isOpen() ?? props?.isOpen ?? defaultProps?.isOpen,
        };
        const buttons = (options as OptionsWithButtons<{}>).buttons;

        return (
          <Modal {...modalProps} isOpen={componentProps.isOpen} onClose={closeWithoutResult}>
            <Modal.Content {...contentProps}>
              {!customParts && !hideCloseButton && <Modal.CloseButton />}
              {!customParts && <Modal.Header {...headerProps}>{header ?? ' '}</Modal.Header>}
              {
                // if customParts === true, that means user want to render all modal parts manually
                customParts || disableScrolling ? (
                  disableScrolling ? (
                    <Box flex={1} {...bodyProps}>
                      <Component {...componentProps} />
                    </Box>
                  ) : (
                    <Component {...componentProps} />
                  )
                ) : (
                  <Modal.Body {...bodyProps}>
                    <Component {...componentProps} />
                  </Modal.Body>
                )
              }
              {!customParts && (buttons || typeof footer !== 'undefined') && (
                <Modal.Footer {...footerProps}>
                  {footer}
                  {buttons && (
                    <Button.Group space={2}>
                      {Object.keys(buttons).map((key) =>
                        createElement(buttons[key as keyof typeof buttons], {
                          key,
                          onPress: () => controller.hide(key),
                        }),
                      )}
                    </Button.Group>
                  )}
                </Modal.Footer>
              )}
            </Modal.Content>
          </Modal>
        );
      });
    };
    return Object.assign(controller, { render });
  };
};

export { createModal };
