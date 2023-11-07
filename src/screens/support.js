import { useEffect } from 'react';
import * as Linking from 'expo-linking';

const linkMailto = 'mailto:support@weareheadlight.com';
const linkWeb = 'https://www.weareheadlight.com/';

function Support({ navigation: { navigate } }) {
  useEffect(() => {
    Linking.canOpenURL(linkMailto)
      .then((supported) => {
        if (supported === true) {
          Linking.openURL(linkMailto);
        } else {
          Linking.openURL(linkWeb);
        }
      });
    navigate('Settings');
  });
  return null;
}

export default Support;
