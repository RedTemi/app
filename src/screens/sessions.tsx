import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { SessionsTabNavProp } from 'navigation/tab';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../components/button';
import EmptyState from '../components/empty';
import SafeArea from '../components/safearea';
import ScrollViewRefresh from '../components/scrollview_refresh';
import SessionBooked from '../components/session_booked';
import SessionBox from '../components/session_box';
import Typography from '../components/typography';
import SessionsScreen from '../graphql/sessions_screen.graphql';
import { dateStrToDateObject, sortByStartDesc } from '../lib/array';
import { Screen } from '../screens/index';

const queryOptions = {
  pollInterval: 30000,
};

export type SessionsScreenNavParams = {
  bookedDate: string;
  eventId: string;
};

const Sessions = () => {
  const route = useRoute<SessionsTabNavProp['route']>();
  const { bookedDate = null, eventId = null } = route.params;

  const {
    data: {
      sessionListAsParticipant: sessionList = [],
      participantGetAsParticipant: { sessionStats: { upcoming = 0, booked = 0 } = {} } = {},
    } = {},
    loading,
    refetch,
  } = useQuery(SessionsScreen, queryOptions);

  useEffect(() => {
    refetch();
  }, [bookedDate, eventId, refetch]);

  const sessionListSorted = dateStrToDateObject(sessionList).sort(sortByStartDesc);
  const sessionsBookableCount = upcoming - booked;

  return (
    <View style={styles.container}>
      <SafeArea hSize="none" style={styles.containerInner}>
        <SessionBooked start={bookedDate} isUpdate={eventId !== null} />
        <Typography variant="display3" centered>
          Sessions
        </Typography>
        {(true || sessionsBookableCount > 0 || sessionListSorted.length === 0) && (
          <View style={styles.bookSessionButtonContainer}>
            <Button goto={Screen.SessionBook}>Book session</Button>
          </View>
        )}
        <ScrollViewRefresh loading={loading} refetch={refetch}>
          <View style={{ paddingTop: 30 }}>
            {sessionListSorted.map((session, index) => (
              <SessionBox key={session.nodeId} index={index} session={session} sessionNo={sessionList.length - index} />
            ))}
            <EmptyState list={sessionListSorted} text="You have no sessions" />
          </View>
        </ScrollViewRefresh>
      </SafeArea>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerInner: {
    marginTop: 60,
    marginBottom: 0,
  },
  bookSessionButtonContainer: {
    margin: 40,
    marginTop: 0,
    marginBottom: 30,
  },
});

export default Sessions;
