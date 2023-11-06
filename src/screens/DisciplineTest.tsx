import ColorPalette from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import WebViewWithLoader from '@Components/WebViewWithLoader';

const source = {
  uri: 'https://test.weareheadlight.com',
};

const DisciplineTest = () => {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({
      headerTintColor: ColorPalette.white,
    });
  }, [setOptions]);

  return (
    <WebViewWithLoader
      source={source}
      style={{
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default DisciplineTest;
