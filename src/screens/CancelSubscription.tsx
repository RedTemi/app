import { linkWeb } from '@Constants/global';
import React from 'react';
import { Linking, View } from 'react-native';

import Link from '@Components/Link';
import Typography, { TypographyVariant } from '@Components/Typography';

const CancelSubscription = () => {
  const linkMailto = 'mailto:cancel@weareheadlight.com';

  const handlePress = () => {
    Linking.canOpenURL(linkMailto).then(supported => {
      if (supported === true) {
        Linking.openURL(linkMailto);
      } else {
        Linking.openURL(linkWeb);
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 90 }}>
      <Typography centered variant={TypographyVariant.display50}>
        Cancel Subscription
      </Typography>
      <View style={{ marginTop: 80 }}>
        <Typography centered>Write to</Typography>
        <Typography centered>
          <Link onPress={handlePress}>cancel@weareheadlight.com</Link> to
        </Typography>
        <Typography centered>cancel your subscription.</Typography>
      </View>
    </View>
  );
};

export default CancelSubscription;
