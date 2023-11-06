import React from 'react';

import WebViewWithLoader from '@Components/WebViewWithLoader';

const source = {
  uri: 'https://www.weareheadlight.com/terms',
};

const Terms = () => {
  return <WebViewWithLoader source={source} />;
};

export default Terms;
