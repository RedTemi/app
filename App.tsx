import { DevicePlatform } from './src/constants/global';
import { ApolloProvider } from '@apollo/client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import client, { persistCacheInStorage } from './src/lib/client';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback, useState } from 'react';
import React from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import './src/lib/sentry';
import './src/lib/amplify';
import { Linking } from 'react-native';
import PushNotification from 'react-native-push-notification';

import Notifications from './src/components/Notifications';
import { AuthProvider } from './src/context/AuthContext';
import { SessionBookTimeProvider } from './src/context/SessionBookTimeContext';
import useFontLoader from './src/hooks/fontLoader';
// import useTrackingConsent from './src/hooks/trackingConsent';
import NavContainer from './src/navigation/container';

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();

PushNotification.configure({
  onNotification(notification) {
    if (notification.data.link) {
      Linking.openURL(notification.data.link);
    }
  },
  requestPermissions: false,
});

PushNotification.createChannel(
  {
    channelId: 'global',
    channelName: 'Global',
  },
  () => {},
);
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  persistCacheInStorage();

  // useTrackingConsent();
  const fontsLoaded = useFontLoader();
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        if (!fontsLoaded) {
          prepare();
        }
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ActionSheetProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <SessionBookTimeProvider>
            {Platform.OS === DevicePlatform.ios && <StatusBar />}
            <Notifications />
            <NavContainer />
          </SessionBookTimeProvider>
        </AuthProvider>
      </ApolloProvider>
    </ActionSheetProvider>
  );
}
