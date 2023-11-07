import { useMutation } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { StatusQuoAddDocument, StatusQuoUpdateDocument } from '../graphql/types.generated';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

import MeEdit from '@Components/MeEdit';
import useHeaderSave from '../hooks//headerButton';
import { EditStatusQuoScreenProp } from '@Navigation/NavMain';
import { Screen } from '../screens/index';

const maxLength = 500;

export type EditStatusQuoScreenParams = {
  statusQuo: string;
  editable?: boolean;
  nodeId: number;
};

const EditStatusQuo = () => {
  const { navigate } = useNavigation();

  const route = useRoute<EditStatusQuoScreenProp>();

  const { statusQuo } = route.params;

  const [content, setContent] = useState(statusQuo || '');

  const [createStatusQuo] = useMutation(StatusQuoAddDocument);
  const [updateStatusQuo] = useMutation(StatusQuoUpdateDocument);

  const saveContent = async () => {
    const contentStr = content.trim();
    if (!contentStr) {
      return;
    }

    if (route.params.nodeId) {
      await updateStatusQuo({
        variables: {
          statusQuo: contentStr,
          id: route.params.nodeId,
        },
      });
    } else {
      await createStatusQuo({
        variables: {
          statusQuo: contentStr,
        },
      });
    }
    navigate(Screen.StatusQuos);
  };

  useHeaderSave(saveContent, 'Save', {}, !route.params.editable);

  return (
    <MeEdit title="Status quo" description="These are the areas where results are not showing up in your work life.">
      <TextInput
        multiline
        textAlignVertical="top"
        placeholder="Type response here"
        onChangeText={setContent}
        value={content}
        maxLength={maxLength}
        autoCorrect={false}
        style={{ width: '100%', flex: 1, color: ColorPalette.black }}
        editable={route.params.editable}
      />
    </MeEdit>
  );
};

export default EditStatusQuo;
