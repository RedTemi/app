import ColorPalette from '@Constants/colors';
import React, { useState } from 'react';
import { View, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

import loaderStyle from '@Styles/Loader';

interface WebViewProps {
  source: { uri: string };
  originWhitelist?: string[];
  style?: StyleProp<ViewStyle>;
}

const WebViewWithLoader = ({ source, originWhitelist = ['https://*'], style }: WebViewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={[{ flex: 1, paddingTop: 20, backgroundColor: ColorPalette.white }, style]}>
      {isLoading && <ActivityIndicator animating={isLoading} style={loaderStyle.loader} />}
      <WebView
        source={source}
        applicationNameForUserAgent="Headlight App"
        originWhitelist={originWhitelist}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

export default WebViewWithLoader;
