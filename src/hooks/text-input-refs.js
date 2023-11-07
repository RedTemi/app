import { useRef } from 'react';

function useTextInputRefs() {
  const textInputRef = useRef();
  function getTextInputRefs() {
    return [textInputRef.current];
  }
  return { textInputRef, getTextInputRefs };
}

export default useTextInputRefs;
