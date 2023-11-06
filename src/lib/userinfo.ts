import Auth from '@aws-amplify/auth';

const currentUserPoolUser = ({ attributes }: {attributes: { email: string; phone_number: string }}) => {
  return attributes;
};

const errHandler = () => {
  return null;
};

const userInfo = () => {
  return Auth.currentUserPoolUser({ bypassCache: true }).then(currentUserPoolUser).catch(errHandler);
};

export default userInfo;
