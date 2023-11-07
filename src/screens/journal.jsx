import React from 'react';
import WebViewWithLoader from '../components/webview';

const source = {
  uri: 'https://journal.weareheadlight.com/',
};

function Journal() {
  return <WebViewWithLoader source={source} />;
}

export default Journal;
