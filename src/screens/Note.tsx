import { useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { NoteAsParticipantDocument } from '../graphql/types.generated';
import titleAndBody from '../lib/titlebody';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native';

import SafeArea from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import useFocusRefetch from '../hooks/focus-refetch';
import useHeaderRight from '../hooks/headerRightNote';
import { NoteScreenProp } from '@Navigation/NavMain';

export type NoteScreenParams = {
  nodeId: string;
};

const Note = () => {
  const { setOptions } = useNavigation();
  const route = useRoute<NoteScreenProp>();

  const { data: { noteAsParticipant: { note = '', privacy = 0 } = {} } = {}, refetch } = useQuery(
    NoteAsParticipantDocument,
    {
      variables: {
        id: route.params.nodeId,
      },
    },
  );

  useFocusRefetch(refetch);

  useHeaderRight(route.params.nodeId, JSON.stringify({ note, privacy }));

  useEffect(() => {
    const title = privacy === 2 ? 'Shared note' : 'Note';
    setOptions({ title });
  }, [privacy, setOptions]);

  const [title, noteBody] = useMemo(() => titleAndBody(note), [note]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: ColorPalette.white }}>
      <SafeArea style={{ marginTop: 90 }}>
        {title && (
          <Typography variant={TypographyVariant.display36} color={ColorPalette.primary}>
            {title}
          </Typography>
        )}

        <Typography variant={TypographyVariant.title}>{noteBody}</Typography>
      </SafeArea>
    </ScrollView>
  );
};

export default Note;
