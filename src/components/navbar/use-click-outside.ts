import {MutableRefObject, useEffect, useRef} from 'react';

export const useClickOutside = (
  elRef: MutableRefObject<HTMLElement | null | undefined>,
  callback: (e: MouseEvent) => void,
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // if the base element does not contain the element the user clicked on - call the callback
      if (
        !elRef?.current?.contains(e.target as HTMLElement) &&
        callbackRef.current
      ) {
        callbackRef.current(e);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [callbackRef, elRef]);
};
