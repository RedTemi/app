import { useMutation, useQuery } from '@apollo/client';
import {
  FocuscheckAddAsParticipantDocument,
  FocuscheckGetAsParticipantDocument,
  FocuscheckUpdateAsParticipantDocument,
} from '../graphql/types.generated';
import { useNavigation } from '@react-navigation/native';
import { SetStateAction, useEffect, useState } from 'react';

import { Screen } from '../screens/index';

const useFocuscheckEdit = (nodeId: string | null, name: string, isNextButtonPressed: boolean) => {
  const { data: { focuscheckGetAsParticipant = {} } = {} } = useQuery(FocuscheckGetAsParticipantDocument, {
    variables: {
      id: nodeId,
    },
  });

  const { navigate } = useNavigation();

  const [
    focuscheckAdd,
    { data: { focuscheckAddAsParticipant: { nodeId: nodeIdNew = null } = {} } = {}, loading: loadingCreate },
  ] = useMutation(FocuscheckAddAsParticipantDocument);

  const [focuscheckEdit, { loading: loadingUpdate }] = useMutation(FocuscheckUpdateAsParticipantDocument);

  const loading = loadingCreate || loadingUpdate;

  const [value, setValue] = useState('');

  const getNodeId = () => {
    if (nodeId !== null) {
      return nodeId;
    }
    return nodeIdNew as string;
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

      if (result.data?.focuscheckAddAsParticipant.nodeId && isNextButtonPressed) {
        navigate(Screen.FocusCheckStep2, {
          nodeId: result.data.focuscheckAddAsParticipant.nodeId,
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

  const onChangeText = (val: SetStateAction<string>) => {
    setValue(val);
  };

  return {
    value,
    onChangeText,
    getNodeId,
    loading,
    onBlur,
  };
};

export default useFocuscheckEdit;
