import { OperationVariables, useMutation } from '@apollo/client';
import { MutationTuple } from '@apollo/client/react/types/types';
import {
  ParticipantSetExponentPushTokenDocument,
  ParticipantSetExponentPushTokenMutation,
} from '../graphql/types.generated';
import { captureException } from '../lib/sentry';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import PushNotification, { PushNotificationObject } from 'react-native-push-notification';

import { useAuthContext } from '../context/AuthContext';

import sentryErrorHandler from '../lib/errorHandler';

const addDevice = async (
  participantSetExponentPushToken: MutationTuple<ParticipantSetExponentPushTokenMutation, OperationVariables>[0],
) => {
  try {
    const token = await messaging().getToken();

    await participantSetExponentPushToken({ variables: { token } });
  } catch (e) {
    sentryErrorHandler(e);
  }
};

const requestPermissions: () => Promise<boolean> = async () => {
  try {
    const authorizationStatus = await messaging().requestPermission();
    return (
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } catch (e) {
    return false;
  }
};

const displayNotification = async (message: PushNotificationObject) => {
  const hasPermissions = await requestPermissions();

  if (hasPermissions) {
    PushNotification.localNotification(message);
  }
};

const Notifications = () => {
  const [participantSetExponentPushToken] = useMutation<ParticipantSetExponentPushTokenMutation>(
    ParticipantSetExponentPushTokenDocument,
    {
      onError: captureException,
    },
  );

  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    const syncDevice = async () => {
      await requestPermissions();

      await addDevice(participantSetExponentPushToken);
    };

    if (isLoggedIn) {
      syncDevice();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    return messaging().onMessage((message: FirebaseMessagingTypes.RemoteMessage) => {
      const extraMessageData = {
        link: message.data?.url,
      };
      const notification: PushNotificationObject = {
        messageId: message.messageId,
        title: message.notification?.title,
        message: message.notification?.body || '',
        userInfo: extraMessageData,
        channelId: 'global',
        bigLargeIcon: 'logo',
        largeIcon: 'logo',
        smallIcon: 'logo',
        priority: 'high',
      };
      displayNotification(notification);
    });
  }, []);

  return null;
};

export default Notifications;
