import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import HeaderButton from '@Components/HeaderButton';

const useHeaderButton = (onPress: () => void, title = 'Save', style = {}, notEditable = false) => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    if (notEditable) {
      return;
    }
    setOptions({
      headerRight: () => <HeaderButton onPress={onPress} title={title} style={style} />,
    });
  }, [onPress, setOptions, style, title]);
};

export default useHeaderButton;
