import React from 'react';
import WebViewWithLoader from '../components/webview';

const source = {
  uri: 'https://www.weareheadlight.com/apply',
};

function Signup() {
  return <WebViewWithLoader source={source} />;
}

export default Signup;
