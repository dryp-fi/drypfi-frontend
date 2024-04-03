import { useEffect } from 'react';

const useLockBodyScroll = (lock: boolean): void => {
  useEffect(() => {
    if (!lock) return;

    const originalStyle: string = window.getComputedStyle(
      document.body,
    ).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
};

export default useLockBodyScroll;
