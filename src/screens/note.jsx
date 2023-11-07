import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import QueryNote from '../graphql/query.note.graphql';
import useFocusRefetch from '../hooks/focus-refetch';
import useHeaderRight from '../hooks/header_right_note';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import titleAndBody from '../lib/titlebody';

function Note({ route: { params: { nodeId } } }) {
  const { setOptions } = useNavigation();
  const {
    data: {
      noteAsParticipant: {
        note = '',
        privacy = 0,
      } = {},
    } = {},
    refetch,
  } = useQuery(QueryNote, {
    variables: {
      id: nodeId,
    },
  });
  useFocusRefetch(refetch);
  useHeaderRight(nodeId, JSON.stringify({ note, privacy }));
  useEffect(() => {
    const title = privacy === 2 ? 'Shared note' : 'Note';
    setOptions({ title });
  }, [privacy, setOptions]);
  const [title, noteBody] = useMemo(() => titleAndBody(note), [note]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeArea style={{ marginTop: 90 }}>
        {title !== '' && (
          <Typography variant="display2" color="primary">
            {title}
          </Typography>
        )}
        <Typography>
          {noteBody}
        </Typography>
      </SafeArea>
    </ScrollView>
  );
}

Note.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nodeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Note;
