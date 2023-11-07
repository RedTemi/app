import { DevicePlatform } from '@Constants/global';
import { requestTrackingPermissionsAsync, PermissionStatus } from 'expo-tracking-transparency';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import Config from 'react-native-config';



const useTrackingConsent = () => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== DevicePlatform.ios) {
        // setupSmartLook();
        return;
      }

      const deviceVersionIOS = Platform.Version.toString().slice(0, 3);
      const deviceMajorVersionIOS = Math.floor(Number(deviceVersionIOS));
      const iosTargetVersionForConsent = 14;

      if (deviceMajorVersionIOS >= iosTargetVersionForConsent) {
        const { status } = await requestTrackingPermissionsAsync();

        if (status === PermissionStatus.GRANTED) {
          // setupSmartLook();
        }
      }
    })();
  }, []);
};

export default useTrackingConsent;
