import React from 'react';

import WebViewWithLoader from '@Components/WebViewWithLoader';

const source = {
  uri: 'https://www.weareheadlight.com/apply',
};

const SignUp = () => {
  return <WebViewWithLoader source={source} />;
};

export default SignUp;
