import { useMutation } from '@apollo/client';
import { SessionDisableMutation, SessionDisableDocument } from '@Graphql/types.generated';

const useSessionDisable = (id: string) => {
  const [sessionDisable] = useMutation<SessionDisableMutation>(SessionDisableDocument);
  function sessionDisableHandler() {
    return sessionDisable({ variables: { id } });
  }
  return sessionDisableHandler;
};

export default useSessionDisable;
