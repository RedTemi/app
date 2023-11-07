import { linkWeb } from '@Constants/global';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';

import { Screen } from '../screens/index';

const linkMailto = 'mailto:support@weareheadlight.com';

const Support = () => {
  const { navigate } = useNavigation();

  Alert.alert('Support render');

  useEffect(() => {
    Linking.canOpenURL(linkMailto).then(supported => {
      if (supported === true) {
        Linking.openURL(linkMailto);
      } else {
        Linking.openURL(linkWeb);
      }
    });
    navigate(Screen.Settings);
  });

  return null;
};

export default Support;
