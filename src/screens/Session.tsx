import { useQuery } from '@apollo/client';
import CheckmarkIcon from '@Assets/icons/black-checkmark.svg';
import ColorPalette from '@Constants/colors';
import { hitSlopRectObject } from '@Constants/constants';
import { SessionsScreenDocument, SessionsScreenQuery } from '../graphql/types.generated';
import { sortByStartDesc } from '../lib/array';
import callHandler from '../lib/callHandler';
import { formatDayMonth, formatHoursMinutes } from '../lib/date';
import sessionTitle from '../lib/SessionTitle';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { addMinutes } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import Button from '@Components/Button';
import ImageAvatar from '@Components/ImageComponents/ImageAvatar';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import { SessionScreenNavProp } from '@Navigation/Tab';
import loaderStyle from '../style/Loader';
import { isDefined } from '@Utils/types';
import { getCycleNo, getNextSession } from '@Utils/utils';

const Session = () => {
  const route = useRoute<SessionScreenNavProp>();
  const { sessionId } = route.params;

  const {
    data: {
      sessionListAsParticipant: sessionList = [],
      participantGetAsParticipant: { sessionStats: {} = {} } = {},
    } = {},
    loading,
    refetch,
  } = useQuery<SessionsScreenQuery>(SessionsScreenDocument);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const sessionListSorted = [...sessionList].sort(sortByStartDesc);

  const [currentSessionIndex, setCurrentSessionIndex] = useState(
    sessionListSorted.findIndex(session => sessionId === session.nodeId),
  );

  const currentSession = sessionListSorted[currentSessionIndex];

  const sessionStartDate = new Date(currentSession.start);

  const past = useMemo(() => {
    const tsNow = new Date().getTime();
    const tsEnd = addMinutes(sessionStartDate, Number(currentSession.duration)).getTime();

    return tsNow > tsEnd;
  }, [currentSession, sessionStartDate]);

  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({ headerTintColor: ColorPalette.primary });
  }, [setOptions]);

  if (loading) {
    return <ActivityIndicator animating={loading} style={loaderStyle.loader} />;
  }

  const onPressCall = () => {
    const links = [
      `facetime:${currentSession.trainer.facetimeId}`,
      `skype:${currentSession.trainer.skypeId}`,
      `tel:${currentSession.trainer.tel}`,
    ];
    callHandler(links);
  };

  const cycleBreaks = sessionList
    .map((session, index) => (session.markedRecognitionAt ? index : null))
    .filter(isDefined)
    .reverse();

  const currentSessionNo = sessionListSorted.length - currentSessionIndex;

  const isNextSession = getNextSession(sessionListSorted)?.nodeId === currentSession.nodeId;

  const cycleNo = getCycleNo(currentSessionIndex, cycleBreaks);

  const dayMonth = formatDayMonth(sessionStartDate);
  const hoursMinutesStart = formatHoursMinutes(sessionStartDate);
  const hoursMinutesEnd = formatHoursMinutes(addMinutes(sessionStartDate, currentSession.duration));

  return (
    <SafeArea vSize={SafeAreaSize.none}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Typography variant={TypographyVariant.display45} centered>
            {isNextSession ? 'Next session' : 'Session'}
          </Typography>
          <Typography variant={TypographyVariant.title} centered>
            {`${sessionTitle(currentSessionNo)}, Cycle ${cycleNo}`}
          </Typography>
          <Row style={styles.sessionInformationContainer}>
            <Typography variant={TypographyVariant.title} style={styles.sessionInformation}>
              {`${dayMonth}\n${hoursMinutesStart} - ${hoursMinutesEnd}`}
            </Typography>
            <Typography style={styles.sessionNo} centered>
              {currentSessionNo}
            </Typography>
            <Typography
              variant={TypographyVariant.title}
              style={[styles.sessionInformation, { textAlign: 'right' }]}
            >{`Coaching with \n ${currentSession.trainer.user.name}`}</Typography>
          </Row>
        </View>

        <ImageAvatar source={{ uri: currentSession.trainer.user.avatar }} style={{ height: 350 }} />

        {!past && (
          <View style={{ marginTop: 30 }}>
            <SafeArea vSize={SafeAreaSize.none} size={SafeAreaSize.lg}>
              <Button style={{ backgroundColor: ColorPalette.blue }} onPress={onPressCall}>
                START VIDEO CALL
              </Button>
            </SafeArea>
          </View>
        )}

        {!!currentSession.notes.length && (
          <View style={styles.tasksContainer}>
            <Typography variant={TypographyVariant.display45} centered>
              Tasks
            </Typography>

            {currentSession.tasks.map(task => {
              return (
                <View style={styles.taskContent} key={task.nodeId}>
                  <Typography style={[styles.taskDescription, task.completedAt ? { width: '85%' } : undefined]}>
                    {task.description}
                  </Typography>
                  {task.completedAt && <CheckmarkIcon />}
                </View>
              );
            })}
          </View>
        )}

        {!!currentSession.notes.length && (
          <View style={[styles.notesContainer, currentSession.tasks.length ? { marginTop: 40 } : null]}>
            <Typography variant={TypographyVariant.display45} centered>
              Notes
            </Typography>

            {currentSession.notes.map((note, index) => {
              return <Typography key={index}>{note.note}</Typography>;
            })}
          </View>
        )}

        <Row
          justifyContent="space-between"
          style={[
            styles.navigationRow,
            currentSessionIndex === sessionListSorted.length - 1 ? { justifyContent: 'flex-end' } : null,
          ]}
        >
          {currentSessionIndex < sessionListSorted.length - 1 && (
            <TouchableOpacity
              onPress={() => setCurrentSessionIndex(currentSessionIndex + 1)}
              hitSlop={hitSlopRectObject}
            >
              <Typography variant={TypographyVariant.title}>Previous</Typography>
            </TouchableOpacity>
          )}

          {currentSessionIndex > 0 && (
            <TouchableOpacity
              onPress={() => setCurrentSessionIndex(currentSessionIndex - 1)}
              hitSlop={hitSlopRectObject}
            >
              <Typography variant={TypographyVariant.title}>Next</Typography>
            </TouchableOpacity>
          )}
        </Row>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  sessionInformationContainer: {
    alignItems: 'flex-end',
  },
  sessionInformation: {
    flex: 1,
    marginBottom: 30,
  },
  sessionNo: {
    fontSize: 120,
    fontWeight: '500',
    marginHorizontal: 20,
    flex: 1,
  },
  tasksContainer: {
    marginHorizontal: 30,
    marginTop: 25,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskDescription: {
    flexShrink: 1,
  },
  notesContainer: {
    marginHorizontal: 30,
  },
  navigationRow: {
    marginHorizontal: 25,
    marginBottom: 25,
    marginTop: 40,
  },
  headerContainer: {
    marginHorizontal: 30,
    marginTop: 36,
  },
});

export default Session;
