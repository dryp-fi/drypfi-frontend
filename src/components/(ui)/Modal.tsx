import React, { ReactNode } from 'react';

import useLockBodyScroll from '@/hooks/useLockBodyScroll';

import Backdrop from './Backdrop';

type ModalProps = {
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  className,
  isOpen,
}) => {
  useLockBodyScroll(isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Backdrop onClose={onClose} />
      <div
        className={`fixed left-[50%] top-[50%] z-30 -translate-x-[50%] -translate-y-[50%] overflow-hidden rounded-md ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
