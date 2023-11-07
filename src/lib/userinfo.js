import Auth from '@aws-amplify/auth';

function currentUserPoolUser({ attributes }) {
  return attributes;
}

function errHandler() {
  return null;
}

function userInfo() {
  return Auth.currentUserPoolUser({ bypassCache: true }).then(currentUserPoolUser).catch(errHandler);
}

export default userInfo;
