import React from 'react';

import WebViewWithLoader from '@Components/WebViewWithLoader';

const source = {
  uri: 'https://www.weareheadlight.com/privacy',
};

const Privacy = () => {
  return <WebViewWithLoader source={source} />;
};

export default Privacy;
