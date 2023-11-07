import { useQuery, useMutation } from '@apollo/client';
import { ParticipantUpdateAsParticipantDocument, ParticipantDetailsDocument } from '../graphql/types.generated';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

import MeEdit from '@Components/MeEdit';
import useHeaderSave from '../hooks/headerButton';
import { Screen } from '../screens/index';

const maxLength = 500;

const EditPossibilities = () => {
  const { navigate } = useNavigation();

  const { data: { participantGetAsParticipant: { possibilities = '' } = {} } = {} } =
    useQuery(ParticipantDetailsDocument);

  const [content, setContent] = useState(possibilities);
  const [contentEdit] = useMutation(ParticipantUpdateAsParticipantDocument);

  const onChangeText = (val: string) => {
    setContent(val);
  };

  const saveContent = async () => {
    const contentStr = content.trim();
    if (contentStr === '') return;
    await contentEdit({
      variables: {
        participant: {
          possibilities: contentStr,
        },
      },
    });
    navigate(Screen.Me);
  };

  useHeaderSave(saveContent);

  return (
    <MeEdit
      title="Possibilities"
      description="What will be possible if I exercise my Discipline?"
    >
      <TextInput
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
};

export default EditPossibilities;
