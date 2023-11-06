import { useQuery } from '@apollo/client';
import { ParticipantTrainerDocument, ParticipantTrainerQuery } from '@Graphql/types.generated';

const useTrainerInfo = () => {
  const {
    data: {
      participantGetAsParticipant: { trainer: { background = '', user: { name = '', avatar = '' } = {} } = {} } = {},
    } = {},
  } = useQuery<ParticipantTrainerQuery>(ParticipantTrainerDocument);
  return {
    background,
    name,
    avatar,
  };
};

export default useTrainerInfo;
