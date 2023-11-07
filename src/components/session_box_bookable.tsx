import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import sessionTitle from '../lib/session_title';
import { Screen } from '../screens/index';
import getStyles from '../style/session_box';

import { Row, Cell } from './flexbox';

interface SessionBoxBookableProps {
  sessionNo: string;
  bookable: boolean;
  trainerId: string;
}

const SessionBoxBookable = ({ sessionNo, bookable, trainerId }: SessionBoxBookableProps) => {
  const { navigate } = useNavigation();
  const styles = getStyles({ past: true });

  const onPress = () => {
    navigate(Screen.SessionBook, { sessionNo, trainerId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={!bookable}>
      <Row alignItems="center">
        <Cell>{!bookable ? null : <Text style={styles.date}>Book</Text>}</Cell>
        <Cell>
          <Text style={styles.title}>{sessionTitle(sessionNo)}</Text>
        </Cell>
      </Row>
    </TouchableOpacity>
  );
};

export default SessionBoxBookable;
