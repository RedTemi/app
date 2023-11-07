import { useQuery } from '@apollo/client';
import QueryTrainer from '../graphql/query.trainer.graphql';

function useTrainerInfo() {
  const {
    data: {
      participantGetAsParticipant: {
        trainer: {
          background = '',
          user: {
            name = '',
            avatar,
          } = {},
        } = {},
      } = {},
    } = {},
  } = useQuery(QueryTrainer);
  return {
    background,
    name,
    avatar,
  };
}

export default useTrainerInfo;
