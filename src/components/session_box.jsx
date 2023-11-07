import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { dayMonth, time, addMinutes } from '../lib/date';
import sessionTitle from '../lib/session_title';
import { Screen } from '../screens/index';
import getStyles from '../style/session_box';

import { Row, Cell } from './flexbox';

function SessionBox({ index, session, sessionNo }) {
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate(Screen.Session, {
      sessionNo,
      nodeId: session.nodeId,
    });
  };

  const { start, duration } = session;
  const tsNow = new Date().getTime();
  const tsEnd = addMinutes(start, duration).getTime();
  const past = tsNow > tsEnd;
  const styles = getStyles({ past });

  return (
    <>
      {index !== 0 && <View style={styles.line} />}
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Row alignItems="center">
          <Cell>
            <Text style={styles.date}>{dayMonth(start)}</Text>
          </Cell>
          <Cell>
            <Text style={styles.title}>{sessionTitle(sessionNo)}</Text>
            <Text style={styles.time}>
              {time(start)}
              &nbsp;-&nbsp;
              {time(addMinutes(start, duration))}
            </Text>
          </Cell>
        </Row>
      </TouchableOpacity>
    </>
  );
}

SessionBox.propTypes = {
  index: PropTypes.number.isRequired,
  session: PropTypes.shape({
    nodeId: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  sessionNo: PropTypes.number.isRequired,
};

export default SessionBox;
