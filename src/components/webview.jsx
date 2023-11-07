import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import webviewStyle from '../style/webview';
import loaderStyle from '../style/loader';

const { safeArea } = webviewStyle;

function WebViewWithLoader({ source, originWhitelist, style }) {
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ ...safeArea, ...style }}>
      {loading && <ActivityIndicator animating={loading} style={loaderStyle.loader} />}
      <WebView
        source={source}
        applicationNameForUserAgent="Headlight App"
        originWhitelist={originWhitelist}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

WebViewWithLoader.defaultProps = {
  style: {},
  originWhitelist: ['https://*'],
};

WebViewWithLoader.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  originWhitelist: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default WebViewWithLoader;
