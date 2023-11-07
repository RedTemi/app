import { useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import SessionList from '../graphql/session_next.graphql';
import { SessionsNextQuery } from '../graphql/types.generated';
import { dayMonthShort, time, addMinutes } from '../lib/date';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import SessionBookNew from '@Components/SessionBookNew';
import Typography, { TypographyVariant } from '@Components/Typography';
import ArrowImages from '@Images/arrows';
import { Screen } from '../screens/index';
import style from '../style/Session';
import { getNextSession } from '@Utils/utils';

const { boxTitle, boxArrow } = style;

const queryOptions = {
  pollInterval: 5000,
};

const SessionNext = () => {
  const { navigate } = useNavigation();
  const { data: { sessionListAsParticipant: sessionList = [] } = {}, loading } = useQuery<SessionsNextQuery>(
    SessionList,
    queryOptions,
  );

  const nextSession = useMemo(() => getNextSession(sessionList), [sessionList]);

  if (loading) {
    return null;
  }

  if (!sessionList.length) {
    return <SessionBookNew text="Book your first sessions" />;
  }

  if (!nextSession?.session) {
    return <SessionBookNew text="Book your next sessions" />;
  }

  const { start, duration } = nextSession;

  const onPress = () => {
    navigate(Screen.Session, {
      nodeId: nextSession.nodeId,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} style={style.containerNext}>
      <Typography variant={TypographyVariant.display36} color={ColorPalette.white} style={boxTitle}>
        Next session
      </Typography>

      <Typography variant={TypographyVariant.header} color={ColorPalette.white} linefit>
        {dayMonthShort(start)}, {time(start)} - {time(addMinutes(start, duration))}
      </Typography>

      <Image source={ArrowImages.WhiteArrow} style={boxArrow} />
    </TouchableOpacity>
  );
};

export default SessionNext;
