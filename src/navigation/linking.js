import messaging from '@react-native-firebase/messaging';
import { Linking } from 'react-native';

const URI_SCHEME = 'weareheadlight:///';

export let alreadyNavigated = false;

const linking = {
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
    const onReceiveURL = data => {
      listener(data.url);
    };

    Linking.addEventListener('url', onReceiveURL);

    const notificationHandler = message => {
      if (!message) {
        return;
      }
      const url = message.data?.url;

      if (url) {
        Linking.openURL(url);
        alreadyNavigated = true;
      }
    };
    messaging().getInitialNotification().then(notificationHandler);

    const unsubscribeNotification = messaging().onNotificationOpenedApp(notificationHandler);

    return () => {
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
    };
  },
};

export default linking;
