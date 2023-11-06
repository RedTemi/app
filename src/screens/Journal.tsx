import React from 'react';

import WebViewWithLoader from '@Components/WebViewWithLoader';

const source = {
  uri: 'https://journal.weareheadlight.com/',
};

const Journal = () => {
  return <WebViewWithLoader source={source} />;
};

export default Journal;
