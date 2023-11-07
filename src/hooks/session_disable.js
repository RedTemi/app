import { useMutation } from '@apollo/client';
import SessionDisable from '../graphql/mutation.session_disable.graphql';

function useSessionDisable(id) {
  const [sessionDisable] = useMutation(SessionDisable);
  function sessionDisableHandler() {
    return sessionDisable({ variables: { id } });
  }
  return sessionDisableHandler;
}

export default useSessionDisable;
