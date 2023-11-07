import { ApolloLink, ApolloClient, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import { awsAppSyncConfig } from './aws-config';

const link = ApolloLink.from([createAuthLink(awsAppSyncConfig), createSubscriptionHandshakeLink(awsAppSyncConfig)]);

const typePolicies = {
  typePolicies: {
    Participant: {
      merge: true,
    },
    Trainer: {
      merge: true,
    },
    SessionStats: {
      merge: true,
    },
    User: {
      merge: true,
    },
    TrainerAvailability: {
      merge: true,
    },
    Session: {
      merge: true,
    },
    Task: {
      merge: true,
    },
  },
};

export const cache = new InMemoryCache(typePolicies);

export const persistCacheInStorage = async () => {
  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });
};

const client = new ApolloClient({
  link,
  cache,
});

export default client;
