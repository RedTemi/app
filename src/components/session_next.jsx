import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import ArrowSEimage from '../assets/arrows/se/white-arrow.png';
import SessionList from '../graphql/session_next.graphql';
import { dateStrToDateObject, sortByStart } from '../lib/array';
import { dayMonthShort, time, addMinutes } from '../lib/date';
import { Screen } from '../screens/index';
import style from '../style/session';

import SessionBookNew from './session_book_new';
import Typography from './typography';

const { boxTitle, boxArrow } = style;

function nextSession(sessionList) {
  const sessionListSorted = dateStrToDateObject(sessionList).sort(sortByStart);
  const d = new Date();
  d.setMinutes(d.getMinutes() - 30);
  const tsMatch = d.getTime();
  const index = sessionListSorted.findIndex(({ start }) => start.getTime() >= tsMatch);
  if (index === -1) return {};
  return {
    sessionNo: index + 1,
    session: sessionListSorted[index],
  };
}

const queryOptions = {
  pollInterval: 5000,
};

const SessionNext = () => {
  const { navigate } = useNavigation();
  const { data: { sessionListAsParticipant: sessionList = [] } = {}, loading } = useQuery(SessionList, queryOptions);

  const { session, sessionNo } = useMemo(() => nextSession(sessionList), [sessionList]);

  if (loading) {
    return null;
  }

  if (!sessionList.length) {
    return <SessionBookNew text="Book your first session" />;
  }

  if (session === undefined) {
    return <SessionBookNew text="Book your next session" />;
  }

  const { start, duration } = session;

  const onPress = () => {
    navigate(Screen.Session, {
      sessionNo,
      nodeId: session.nodeId,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} style={style.containerNext}>
      <Typography variant="display2" color="white" style={boxTitle}>
        Next session
      </Typography>
      <Typography variant="heading" color="white" linefit>
        {dayMonthShort(start)}, {time(start)} - {time(addMinutes(start, duration))}
      </Typography>
      <Image source={ArrowSEimage} style={boxArrow} />
    </TouchableOpacity>
  );
};

export default SessionNext;
