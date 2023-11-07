import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getStyles from '../style/note_box';
import { Row, Cell } from './flexbox';
import Typography from './typography';
import { ArrowRight } from './icons';

function NoteBox({
  note,
  note: {
    pretitle,
    title,
    body,
    type,
  },
}) {
  const { navigate } = useNavigation();
  const styles = getStyles({ type });
  function onPress() {
    navigate('Note', {
      noteSerialized: JSON.stringify(note),
    });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Row alignItems="center">
        <Cell style={{ paddingLeft: 25, width: '90%' }}>
          <Typography style={{ paddingBottom: 5 }}>{pretitle}</Typography>
          <Typography variant="title">{title}</Typography>
          <Typography numberOfLines={1} style={{ maxWidth: '95%' }}>{body}</Typography>
        </Cell>
        <Cell style={{ width: 30 }}>
          <ArrowRight size="xl" color="black" />
        </Cell>
      </Row>
    </TouchableOpacity>
  );
}

NoteBox.propTypes = {
  note: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteBox;
