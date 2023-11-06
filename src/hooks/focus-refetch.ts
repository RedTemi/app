import { ApolloQueryResult } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const useFocusRefetch = (refetch: {
  (variables?: Partial<{ id: string }> | undefined): Promise<ApolloQueryResult<any>>;
  (): void;
}) => {
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
};

export default useFocusRefetch;
