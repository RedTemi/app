import React from 'react';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import Typography from '../components/typography';
import Link from '../components/link';

function CancelSubscription() {
  const linkMailto = 'mailto:cancel@weareheadlight.com';
  const linkWeb = 'https://www.weareheadlight.com/';

  function handlePress() {
    Linking.canOpenURL(linkMailto)
      .then((supported) => {
        if (supported === true) {
          Linking.openURL(linkMailto);
        } else {
          Linking.openURL(linkWeb);
        }
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 90 }}>
      <Typography centered variant="display3">Cancel Subscription</Typography>
      <View style={{ marginTop: 80 }}>
        <Typography centered>Write to</Typography>
        <Typography centered>
          <Link onPress={handlePress} href="mailto:cancel@weareheadlight.com">cancel@weareheadlight.com</Link>
          {' '}
          to
        </Typography>
        <Typography centered>cancel your subscription.</Typography>
      </View>
    </View>
  );
}

export default CancelSubscription;
