import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';

const URI_SCHEME = 'weareheadlight:///';

export let alreadyNavigated = false;

const linking: LinkingOptions = {
  prefixes: [URI_SCHEME],
  config: {
    initialRouteName: 'Main',
    screens: {
      Main: {
        screens: {
          Note: 'note/:nodeId',
          Task: 'task/:nodeId',
          Session: 'session/:nodeId',
          Messages: 'message/:nodeId',
        },
      },
    },
  },
  subscribe: listener => {
    const onReceiveURL = (data: { url: string }) => {
      listener(data.url);
    };

    Linking.addEventListener('url', onReceiveURL);

    const notificationHandler = (message: FirebaseMessagingTypes.RemoteMessage | null) => {
      if (!message) {
        return;
      }
      const url = message.data?.url;

      if (url) {
        Linking.openURL(url.toString());
        alreadyNavigated = true;
      }
    };
    messaging().getInitialNotification().then(notificationHandler);

    const unsubscribeNotification = messaging().onNotificationOpenedApp(notificationHandler);

    return () => {
      Linking.removeAllListeners('url');
      unsubscribeNotification();
    };
  },
};

export default linking;
