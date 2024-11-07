import { useEffect, useRef } from "react";

export const useInputEvent = (eventName, callback) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.addEventListener(eventName, callback);

    return () => {};
  });

  return inputRef;
}