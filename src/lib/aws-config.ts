import Auth from '@aws-amplify/auth';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { AuthOptions } from 'aws-appsync-auth-link';

import dataIdFromObject from './graphql_id';

const authenticationType = 'AMAZON_COGNITO_USER_POOLS';
const authenticationFlowType = 'CUSTOM_AUTH';
const region = 'eu-west-1';

const jwtToken = () => {
  function getToken(session: CognitoUserSession) {
    return session.getIdToken().getJwtToken();
  }
  return Auth.currentSession().then(getToken);
};

const makeAmplifyConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      Auth: {
        userPoolId: 'eu-west-1_Xf50pxxO4',
        userPoolWebClientId: '1tru6uf3t3ve8dfn33703j5k0o',
        authenticationFlowType,
      },
      aws_appsync_graphqlEndpoint: 'https://graphql.weareheadlight.com/',
      aws_appsync_authenticationType: authenticationType,
    };
  }
  return {
    Auth: {
      userPoolId: 'eu-west-1_ZCUMhyoIx',
      userPoolWebClientId: '4hn7qohq946vlfourk43ic91vn',
      authenticationFlowType,
    },
    aws_appsync_graphqlEndpoint: 'https://graphql.dev.weareheadlight.com/',
    aws_appsync_authenticationType: authenticationType,
  };
};

const awsAmplifyConfig = makeAmplifyConfig();

const awsAppSyncConfig = {
  url: awsAmplifyConfig.aws_appsync_graphqlEndpoint,
  region,
  auth: {
    type: authenticationType,
    jwtToken,
  } as AuthOptions,
  cacheOptions: {
    dataIdFromObject,
  },
};

export { awsAmplifyConfig, awsAppSyncConfig, authenticationFlowType };
