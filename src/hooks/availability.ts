import { useQuery } from '@apollo/client';
import { getDaysInMonth } from 'date-fns';
import { useMemo } from 'react';
import { SessionBookDataQuery } from 'types.generated';
import SessionBookData from '../graphql/query.session_book.graphql';

const daysFetchMore = 60;
const pollInterval = 5 * 60 * 1000;

const updateQuery = (prev, { fetchMoreResult }) => {
  if (fetchMoreResult === undefined) {
    return prev;
  }

  const [{ __typename }] = fetchMoreResult.trainerAvailability;
  const merge = [...prev.trainerAvailability, ...fetchMoreResult.trainerAvailability];
  const trainerAvailability = [...merge.map(({ start }) => start)].map(start => ({ __typename, start }));

  return { ...prev, trainerAvailability };
};

const useAvailability = (startDate: string) => {
  const daysCountInMonth = getDaysInMonth(new Date(startDate));

  const { data, loading, refetch, fetchMore } = useQuery<SessionBookDataQuery>(SessionBookData, {
    variables: { start: startDate, days: daysCountInMonth },
    notifyOnNetworkStatusChange: true,
    pollInterval,
    fetchPolicy: 'network-only',
  });

  const trainerAvailability = useMemo(() => {
    return data?.trainerAvailability || [];
  }, [data?.trainerAvailability]);

  const onEndReached = () => {
    if (loading) {
      return;
    }

    if (!trainerAvailability.length) {
      return;
    }

    const { start } = trainerAvailability[trainerAvailability.length - 1];

    if (fetchMore !== undefined) {
      fetchMore({
        variables: { start, days: daysFetchMore },
        notifyOnNetworkStatusChange: true,
        updateQuery,
      });
    }
  };

  return {
    loading,
    refetch,
    onEndReached,
    trainerAvailability,
  };
};

export default useAvailability;
