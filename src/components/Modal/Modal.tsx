import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';

import { Text } from 'components';

import { CloseIcon } from 'assets/icons';

import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import styles from './styles.module.scss';

export interface ModalProps {
  modalClassName?: string;
  outerClassName?: string;
  closeClassName?: string;
  containerClassName?: string;
  visible: boolean;
  onClose: () => void;
  title?: string | JSX.Element,
  maxWidth?: number,
}

export const Modal: React.FC<ModalProps> = ({
  modalClassName,
  outerClassName,
  containerClassName,
  closeClassName,
  visible,
  onClose,
  children,
  title = '',
  maxWidth,
}) => {
  const isDark = useShallowSelector(userSelector.getProp('isDark'));
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const disableBodyScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);
  const enableBodyScroll = useCallback(() => {
    document.body.style.overflow = 'unset';
  }, []);
  useEffect(() => {
    if (visible) {
      disableBodyScroll();
    }
    return () => enableBodyScroll();
  }, [disableBodyScroll, enableBodyScroll, visible]);

  return createPortal(
    visible && (
      <div className={cn(styles.modal, modalClassName, { [styles.dark]: isDark })}>
        <div className={cn(styles.outer, outerClassName)} style={{ maxWidth }}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <div className={cn(styles.container, containerClassName)}>
              {title ? <Text className={styles.title}>{title}</Text> : null}
              {children}
              <button type="button" className={cn(styles.close, closeClassName)} onClick={onClose}>
                <img src={CloseIcon} width={16} height={16} alt="close" />
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    ),
    document.body,
  );
};
