import React from 'react';
import WebViewWithLoader from '../components/webview';

const source = {
  uri: 'https://www.weareheadlight.com/terms',
};

function Terms() {
  return <WebViewWithLoader source={source} />;
}

export default Terms;
