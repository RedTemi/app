import ColorPalette from '@Constants/colors';
import { linkWeb } from '@Constants/global';
import React from 'react';
import { Linking } from 'react-native';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import Typography, { TypographyVariant } from '@Components/Typography';

const SupportLink = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const linkMailto = 'mailto:contact@weareheadlight.com';

  const handlePress = () => {
    Linking.canOpenURL(linkMailto).then(supported => Linking.openURL(supported ? linkMailto : linkWeb));
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[{ padding: 30, margin: 'auto' }, style]}>
      <Typography
        variant={TypographyVariant.title}
        color={ColorPalette.black}
        style={{
          textAlign: 'center',
        }}
      >
        Contact us
      </Typography>
    </TouchableOpacity>
  );
};

export default SupportLink;
