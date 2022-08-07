import { Box, Button, Modal } from 'native-base';
import { atom, NoInfer } from 'rativ';
import { slot } from 'rativ/react';

import { createElement, FC, ReactNode } from 'react';

import { translateResponsiveValues } from '../hooks/translateResponsiveValues';
import { MaybeResponsiveValue, PropsOf, VoidFunction } from '../types';

export type ModalBodyProps<R> = {
  isOpen: boolean;
  onClose: (result: R) => void;
};

export type ModalProps = {
  isOpen: boolean;
};

export type Options = {
  header?: ReactNode;
  footer?: ReactNode;
  customParts?: boolean;
  hideCloseButton?: boolean;
  disableScrolling?: boolean;
  modalProps?: MaybeResponsiveValue<PropsOf<typeof Modal>>;
  contentProps?: MaybeResponsiveValue<PropsOf<typeof Modal['Content']>>;
  bodyProps?: MaybeResponsiveValue<PropsOf<typeof Modal['Body']>>;
  footerProps?: MaybeResponsiveValue<PropsOf<typeof Modal['Footer']>>;
  headerProps?: MaybeResponsiveValue<PropsOf<typeof Modal['Header']>>;
};

export type ModalButtonProps = { onPress: VoidFunction };

export type ModalButtons = { [key: string]: FC<ModalButtonProps> };

export type OptionsWithButtons<B extends ModalButtons> = Options & { buttons: B };

export type ModalController<R> = {
  isOpen(): boolean;
  show(): Promise<R | undefined>;
  hide(result?: R): void;
};

export type ModalCreator<T, R> = {
  (): ModalController<R> & { render(props: T & ModalProps): ReactNode };

  (defaultProps: T & ModalProps): ModalController<R> & {
    render(props?: Partial<T & ModalProps>): ReactNode;
  };
};

export type CreateModal = {
  <T>(component: FC<T>, options?: Options): NoInfer<
    ModalCreator<T, T extends ModalBodyProps<infer R> ? R : void>
  >;

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
      const [rvModalProps, rvContentProps, rvHeaderProps, rvBodyProps, rvFooterProps] =
        translateResponsiveValues(modalProps, contentProps, headerProps, bodyProps, footerProps);

      return slot(() => {
        const componentProps = {
          ...defaultProps,
          ...props,
          isOpen: isOpen() ?? props?.isOpen ?? defaultProps?.isOpen,
        };
        const buttons = (options as OptionsWithButtons<{}>).buttons;

        return (
          <Modal {...rvModalProps} isOpen={componentProps.isOpen} onClose={closeWithoutResult}>
            <Modal.Content {...rvContentProps}>
              {!customParts && !hideCloseButton && <Modal.CloseButton />}
              {!customParts && <Modal.Header {...rvHeaderProps}>{header ?? ' '}</Modal.Header>}
              {
                // if customParts === true, that means user want to render all modal parts manually
                customParts || disableScrolling ? (
                  disableScrolling ? (
                    <Box flex={1} {...rvBodyProps}>
                      <Component {...componentProps} />
                    </Box>
                  ) : (
                    <Component {...componentProps} />
                  )
                ) : (
                  <Modal.Body {...rvBodyProps}>
                    <Component {...componentProps} />
                  </Modal.Body>
                )
              }
              {!customParts && (buttons || typeof footer !== 'undefined') && (
                <Modal.Footer {...rvFooterProps}>
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
