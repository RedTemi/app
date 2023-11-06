import { useRef } from 'react';
import { TextInput } from 'react-native';

const useTextInputRefs = () => {
  const textInputRef = useRef<TextInput>(null);

  const getTextInputRefs = () => {
    return [textInputRef.current];
  };

  return { textInputRef, getTextInputRefs };
};

export default useTextInputRefs;
