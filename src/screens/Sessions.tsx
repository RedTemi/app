import { useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { Session, SessionsNextQuery, SessionsScreenDocument, SessionsScreenQuery } from '../graphql/types.generated';
import { sortByStartDesc } from '../lib/array';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import Button from '@Components/Button';
import Loader from '@Components/Loader';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import SessionBooked from '@Components/SessionBooked';
import SessionBox, { SessionBoxVariant } from '@Components/SessionBox';
import SessionCycleDivider from '@Components/SessionCycleDivider';
import SessionPlaceholderBox from '@Components/SessionPlaceholderBox';
import Typography, { TypographyVariant } from '@Components/Typography';
import { SessionsTabNavProp } from '@Navigation/Tab';
import { Screen } from '../screens/index';
import { isDefined } from '@Utils/types';
import { getCycleNo, getNextSession } from '@Utils/utils';

const queryOptions = {
  pollInterval: 30000,
};

const Sessions = () => {
  const [nextSessionInFocus, setNextSessionInFocus] = useState(true);
  const sessionsListRef = useRef<FlatList<SessionsNextQuery['sessionListAsParticipant'][number] | undefined>>(null);
  const route = useRoute<SessionsTabNavProp['route']>();
  const { bookedDate = '', eventId = '' } = route.params;

  const {
    data: {
      sessionListAsParticipant: sessionList = [],
      participantGetAsParticipant: { sessionStats: {} = {} } = {},
    } = {},
    loading,
    refetch,
  } = useQuery<SessionsScreenQuery>(SessionsScreenDocument, queryOptions);

  const sessionListSorted = [...sessionList].sort(sortByStartDesc);

  const allSessionsList = [...new Array<undefined>(Math.max(4 - sessionListSorted.length, 0)), ...sessionListSorted];

  const nextSession = getNextSession(sessionListSorted);

  const nextSessionIndex = allSessionsList.findIndex(session => session?.nodeId === nextSession?.nodeId);

  const hasFourSessionsBooked = sessionListSorted.length >= 4;

  const hasFourPreviousSessionsBeforeNextSession = sessionListSorted.length - nextSessionIndex + 1 >= 4;

  const isToggleTextShown = hasFourSessionsBooked && hasFourPreviousSessionsBeforeNextSession;

  const cycleBreaks = allSessionsList
    .map((session, index) => (session?.markedRecognitionAt ? index : null))
    .filter(isDefined)
    .reverse();

  useEffect(() => {
    refetch();
  }, [bookedDate, eventId, refetch]);

  useFocusEffect(
    useCallback(() => {
      if (hasFourSessionsBooked) {
        sessionsListRef.current?.scrollToIndex({ index: nextSessionIndex });
      }
    }, [hasFourSessionsBooked, nextSessionIndex]),
  );

  const getSessionBoxVariant = (index: number) => {
    if (index === nextSessionIndex) {
      return SessionBoxVariant.nextSession;
    }
    if (index < nextSessionIndex) {
      return SessionBoxVariant.upcomingSession;
    }
    return SessionBoxVariant.prevSession;
  };

  const onToggleTextPress = () => {
    if (nextSessionInFocus) {
      sessionsListRef.current?.scrollToIndex({ index: 0 });
      setNextSessionInFocus(false);
      return;
    }
    sessionsListRef.current?.scrollToIndex({ index: nextSessionIndex });
    setNextSessionInFocus(true);
  };

  const renderTitle = () => {
    const nextBookedSessionIndex = sessionListSorted.findIndex(session => session.nodeId === nextSession?.nodeId);

    if (nextSessionIndex < 0 || sessionListSorted.length === 0) {
      return (
        <Typography style={styles.longTitleText} centered>
          You have no{'\n'}booked sessions
        </Typography>
      );
    }

    if (sessionListSorted.length < 4) {
      const sessionsAfterNextSession = sessionListSorted.length - nextBookedSessionIndex;
      return (
        <Typography style={styles.longTitleText} centered>
          You only have{'\n'}
          {sessionsAfterNextSession} booked session
        </Typography>
      );
    }

    console.log('Sessions render');

    return (
      <Typography variant={TypographyVariant.display45} centered>
        Sessions
      </Typography>
    );
  };

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeArea hSize={SafeAreaSize.none} style={styles.containerInner}>
        <SessionBooked start={bookedDate || ''} isUpdate={Boolean(eventId)} />
        {renderTitle()}
        {isToggleTextShown && (
          <TouchableOpacity onPress={onToggleTextPress}>
            <Typography color={ColorPalette.blue} centered style={styles.toggleText}>
              {nextSessionInFocus ? `Show ${nextSessionIndex} upcoming sessions` : 'Show next session'}
            </Typography>
          </TouchableOpacity>
        )}
        <FlatList
          ref={sessionsListRef}
          style={styles.sessionsList}
          data={allSessionsList}
          keyExtractor={(item, index) => item?.nodeId || '' + index}
          onScrollEndDrag={() => {
            setNextSessionInFocus(false);
          }}
          renderItem={({ item, index: sessionIndex }) => {
            const hasVerticalLine = !(
              sessionIndex === allSessionsList.length - 1 || allSessionsList[sessionIndex + 1]?.markedRecognitionAt
            );

            const sessionNo = allSessionsList.length - sessionIndex;

            return (
              <View key={sessionIndex}>
                {cycleBreaks.includes(sessionIndex) && (
                  <SessionCycleDivider cycleNumber={getCycleNo(sessionIndex, cycleBreaks)} />
                )}

                {!item && (
                  <View>
                    <SessionPlaceholderBox hasVerticalLine={hasVerticalLine} sessionNo={sessionNo} />
                  </View>
                )}

                {item && (
                  <SessionBox
                    key={item.nodeId}
                    hasVerticalLine={hasVerticalLine}
                    session={item as Session}
                    sessionNo={sessionNo}
                    variant={getSessionBoxVariant(sessionIndex)}
                  />
                )}
              </View>
            );
          }}
          initialScrollIndex={hasFourSessionsBooked ? nextSessionIndex : 0}
          onScrollToIndexFailed={info => {
            setTimeout(() => {
              sessionsListRef.current?.scrollToIndex({ index: info.index, animated: true });
            }, 100);
          }}
        />
        <View style={styles.bookSessionButtonContainer}>
          <Button goto={Screen.SessionBook}>Book sessions</Button>
        </View>
      </SafeArea>
    </View>
  );
};

const styles = StyleSheet.create({
  longTitleText: {
    fontSize: 30,
    fontWeight: '500',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
  },
  containerInner: {
    marginTop: 64,
  },
  sessionsList: {
    marginTop: 30,
  },
  bookSessionButtonContainer: {
    margin: 30,
  },
  toggleText: {
    fontWeight: 'bold',
  },
});

export default Sessions;
