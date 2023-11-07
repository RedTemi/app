import Auth from '@aws-amplify/auth';
import dataIdFromObject from './graphql_id';

const authenticationType = 'AMAZON_COGNITO_USER_POOLS';

function jwtToken() {
  function getToken(session) {
    return session.getIdToken().getJwtToken();
  }
  return Auth.currentSession().then(getToken);
}

const authenticationFlowType = 'CUSTOM_AUTH';
const region = 'eu-west-1';

function makeAmplifyConfig() {
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
}

const awsAmplifyConfig = makeAmplifyConfig();
const awsAppSyncConfig = {
  url: awsAmplifyConfig.aws_appsync_graphqlEndpoint,
  region,
  auth: {
    type: authenticationType,
    jwtToken,
  },
  cacheOptions: {
    dataIdFromObject,
  },
};

export {
  awsAmplifyConfig,
  awsAppSyncConfig,
  authenticationFlowType,
};
