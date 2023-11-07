import { useQuery, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';

import Background from '../components/background';
import Button from '../components/button';
import Cell from '../components/cell';
import Cross from '../components/cross';
import Row from '../components/row';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import { useSessionBookTime } from '../context/SessionBookTimeContext';
import SessionBookMutation from '../graphql/mutation.session_book.graphql';
import QueryStats from '../graphql/participant_session_stats.graphql';
import { dayMonthWeekday, time } from '../lib/date';
import errorHandler from '../lib/error_handler';
import { Screen } from '../screens/index';

function SessionBookConfirm({
  route: {
    params: { start, eventId },
  },
}) {
  const {
    data: {
      participantGetAsParticipant: {
        sessionStats: { total, previous } = {},
        trainer: { user: { name } = {} } = {},
      } = {},
    } = {},
  } = useQuery(QueryStats);

  const [disabled, setDisabled] = useState(true);
  const { navigate, goBack } = useNavigation();
  const { isOnboarding } = useSessionBookTime();

  function onError(err) {
    setDisabled(false);
    errorHandler(err);
  }
  const [sessionBookMutation] = useMutation(SessionBookMutation, { onError });
  function init() {
    setDisabled(false);
  }
  useEffect(init, []);
  function onPressX() {
    goBack();
  }
  async function onPress() {
    setDisabled(true);
    await sessionBookMutation({
      variables: {
        start,
        eventId,
      },
    });

    if (isOnboarding) {
      return navigate(Screen.OnboardFinish);
    }

    navigate('Sessions', { bookedDate: start, eventId });
  }

  return (
    <Background color="black" tall>
      <SafeArea size="lg">
        <TouchableOpacity
          onPress={onPressX}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <Cross size="md" />
        </TouchableOpacity>
        <Row justifyContent="center" column style={{ flex: 1, gap: 10 }}>
          <Cell>
            <View>
              <Typography variant="display3" color="white" linefit style={{ marginBottom: 0 }}>
                Session&nbsp;
                {total + 1}
              </Typography>
              <Typography variant="title" color="white" style={{ marginBottom: 20 }}>
                With&nbsp;
                {name}
              </Typography>
              <Typography variant="display1" color="white" style={{ marginBottom: 30 }}>
                {dayMonthWeekday(start)} {time(start)}
              </Typography>
              <Typography color="gray200" style={{ marginBottom: 30 }}>
                (The previous booked session was&nbsp;
                {dayMonthWeekday(previous)})
              </Typography>
            </View>
          </Cell>
          <Button onPress={onPress} color="blue" disabled={disabled}>
            Book session
          </Button>
        </Row>
      </SafeArea>
    </Background>
  );
}

SessionBookConfirm.defaultProps = {
  route: {
    params: {
      eventId: null,
    },
  },
};

SessionBookConfirm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      start: PropTypes.string.isRequired,
      eventId: PropTypes.string,
    }),
  }),
};

export default SessionBookConfirm;
