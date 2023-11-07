import { useMutation } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import ColorPalette from '../constants/colors';

import MeEdit from '../components/me_edit';
import useHeaderSave from '../hooks/header_button';
import useTextInputRefs from '../hooks/text-input-refs';
import { StatusQuoAddDocument, StatusQuoUpdateDocument } from '../../types.generated';

import { Screen } from './index';

const maxLength = 500;

const EditStatusQuo = () => {
  const { navigate } = useNavigation();
  const { textInputRef, getTextInputRefs } = useTextInputRefs();

  const route = useRoute();

  const [content, setContent] = useState(route.params?.statusQuo || '');

  const [createStatusQuo] = useMutation(StatusQuoAddDocument);
  const [updateStatusQuo] = useMutation(StatusQuoUpdateDocument);

  const saveContent = async () => {
    const contentStr = content.trim();
    if (!contentStr) {
      return;
    }

    if (route.params?.nodeId) {
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

  useHeaderSave(saveContent, 'Save', {}, !route.params?.editable);

  return (
    <MeEdit
      title="Status quo"
      description="These are the areas where results are not showing up in your work life."
      getTextInputRefs={getTextInputRefs}
    >
      <TextInput
        ref={textInputRef}
        multiline
        textAlignVertical="top"
        placeholder="Type response here"
        onChangeText={setContent}
        value={content}
        maxLength={maxLength}
        autoCorrect={false}
        style={{ width: '100%', flex: 1, color: ColorPalette.black }}
        editable={route.params?.editable}
      />
    </MeEdit>
  );
};

export default EditStatusQuo;
