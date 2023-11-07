import React from 'react';
import { View, Platform } from 'react-native';
import { Linking } from 'react-native';

import Button from '../components/button';
import { Row } from '../components/flexbox';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import { DevicePlatform } from '../constants/global';

const UpdateAvailableScreen = () => {
  const isIOS = Platform.OS === DevicePlatform.ios;

  const openAppStore = async () => {
    const appStoreLink = 'itms-apps://apps.apple.com/us/app/headlight-coaching-app/id1527092947';
    const googlePlayStoreLink = 'market://details?id=com.weareheadlight.app2';

    const link = isIOS ? appStoreLink : googlePlayStoreLink;

    const isSupportedLink = await Linking.canOpenURL(link);

    if (isSupportedLink) {
      Linking.openURL(link);
    }
  };

  const appStoreName = isIOS ? 'App Store' : 'Google Play Store';

  return (
    <View style={{ flex: 1 }}>
      <SafeArea size="lg">
        <Row column style={{ height: '100%' }}>
          <View style={{ marginTop: '100%' }}>
            <Typography variant="display2">Update available</Typography>
          </View>
          <View style={{ marginTop: 0, width: '100%' }}>
            <Button wide onPress={openAppStore} color="black">
              {`Go to ${appStoreName}`}
            </Button>
          </View>
        </Row>
      </SafeArea>
    </View>
  );
};

export default UpdateAvailableScreen;
