import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import FOCUSCHECK_ADD_AS_PARTICIPANT from '../graphql/focuscheck_add_as_participant.graphql';
import FOCUSCHECK_UPDATE_AS_PARTICIPANT from '../graphql/mutation.focuscheckUpdateAsParticipant.graphql';
import QueryFocuscheck from '../graphql/query.focuscheck.graphql';

function useFocuscheckEdit(nodeId, name, isNextButtonPressed) {
  const { data: { focuscheckGetAsParticipant = {} } = {} } = useQuery(QueryFocuscheck, {
    variables: {
      id: nodeId,
    },
  });

  const { navigate } = useNavigation();

  const [
    focuscheckAdd,
    { data: { focuscheckAddAsParticipant: { nodeId: nodeIdNew = null } = {} } = {}, loading: loadingCreate },
  ] = useMutation(FOCUSCHECK_ADD_AS_PARTICIPANT);

  const [focuscheckEdit, { loading: loadingUpdate }] = useMutation(FOCUSCHECK_UPDATE_AS_PARTICIPANT);

  const loading = loadingCreate || loadingUpdate;

  const [value, setValue] = useState('');

  const getNodeId = () => {
    if (nodeId !== null) {
      return nodeId;
    }
    return nodeIdNew;
  };

  useEffect(() => {
    if (!nodeId || !Object.keys(focuscheckGetAsParticipant).length) {
      return;
    }
    setValue(focuscheckGetAsParticipant[name]);
  }, []);

  const onBlur = async () => {
    if (!nodeId) {
      if (loadingCreate) {
        return;
      }

      const result = await focuscheckAdd({
        variables: {
          [name]: value,
        },
      });

      if (result.data.focuscheckAddAsParticipant?.nodeId && isNextButtonPressed) {
        navigate('Focuscheck2', {
          nodeId: result.data.focuscheckAddAsParticipant?.nodeId,
        });
      }
    } else {
      if (loadingUpdate) return;
      focuscheckEdit({
        variables: {
          id: getNodeId(),
          [name]: value,
        },
      });
    }
  };

  const onChangeText = val => {
    setValue(val);
  };

  return {
    value,
    onChangeText,
    getNodeId,
    loading,
    onBlur,
  };
}

export default useFocuscheckEdit;
