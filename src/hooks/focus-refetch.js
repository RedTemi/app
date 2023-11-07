import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

function useFocusRefetch(refetch) {
  useFocusEffect(useCallback(() => {
    refetch();
  }, [refetch]));
}

export default useFocusRefetch;
