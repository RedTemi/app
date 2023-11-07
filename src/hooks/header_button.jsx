import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import HeaderButton from '../components/header_button';

function useHeaderButton(onPress, title = 'Save', style = {}, notEditable = false) {
  const { setOptions } = useNavigation();

  useEffect(() => {
    if (notEditable) {
      return;
    }
    setOptions({
      headerRight: () => <HeaderButton onPress={onPress} title={title} style={style} />,
    });
  }, [onPress, setOptions, style, title]);
}

export default useHeaderButton;
