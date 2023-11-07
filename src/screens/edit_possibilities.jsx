import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/client';
import PARTICIPANT_INFO from '../graphql/participant_info.graphql';
import participantUpdateAsParticipant from '../graphql/mutation.participantUpdateAsParticipant.graphql';
import useHeaderSave from '../hooks/header_button';
import MeEdit from '../components/me_edit';
import useTextInputRefs from '../hooks/text-input-refs';

const maxLength = 500;

function EditPossibilities() {
  const { navigate } = useNavigation();
  const { textInputRef, getTextInputRefs } = useTextInputRefs();
  const {
    data: { participantGetAsParticipant: { possibilities = '' } = {} } = {},
  } = useQuery(PARTICIPANT_INFO);
  const [content, setContent] = useState(possibilities);
  const [contentEdit] = useMutation(participantUpdateAsParticipant);
  function onChangeText(val) {
    setContent(val);
  }
  async function saveContent() {
    const contentStr = content.trim();
    if (contentStr === '') return;
    await contentEdit({
      variables: {
        participant: {
          possibilities: contentStr,
        },
      },
    });
    navigate('Me');
  }
  useHeaderSave(saveContent);
  return (
    <MeEdit
      title="Possibilities"
      description="What will be possible if I exercise my Discsipline?"
      getTextInputRefs={getTextInputRefs}
    >
      <TextInput
        ref={textInputRef}
        multiline
        placeholder="Type response here"
        onChangeText={onChangeText}
        value={content}
        maxLength={maxLength}
        autoCorrect={false}
        style={{ width: '100%', flex: 1 }}
      />
    </MeEdit>
  );
}

export default EditPossibilities;
