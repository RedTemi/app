import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import WebViewWithLoader from '../components/webview';

const source = {
  uri: 'https://test.weareheadlight.com',
};

const style = {
  margin: 0,
  padding: 0,
};

function DisciplineTest() {
  const { setOptions } = useNavigation();
  useEffect(() => {
    setOptions({
      headerTintColor: 'white',
    });
  }, [setOptions]);
  return <WebViewWithLoader source={source} style={style} />;
}

export default DisciplineTest;
