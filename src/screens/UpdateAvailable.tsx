import React from 'react';
import { Linking, Platform, View } from 'react-native';

import Row from '@Components/Row';

import Button from '@Components/button';
import SafeArea, { SafeAreaSize } from '@Components/safearea';
import Typography, { TypographyVariant } from '@Components/typography';
import { DevicePlatform } from '@Constants/global';

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
      <SafeArea size={SafeAreaSize.lg}>
        <Row style={{ height: '100%' }}>
          <View style={{ marginTop: '100%' }}>
            <Typography variant={TypographyVariant.display22}>Update available</Typography>
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
