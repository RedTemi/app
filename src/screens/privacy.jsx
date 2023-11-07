import React from 'react';
import WebViewWithLoader from '../components/webview';

const source = {
  uri: 'https://www.weareheadlight.com/privacy',
};

function Privacy() {
  return <WebViewWithLoader source={source} />;
}

export default Privacy;
