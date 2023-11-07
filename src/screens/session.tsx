import { useQuery } from '@apollo/client';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, Image, View, ScrollView, TouchableOpacity, Text } from 'react-native';

import Avatar from '../components/avatar';
import Button from '../components/button';
import FeedListItem from '../components/FeedListItem';
import { Row } from '../components/flexbox';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import SessionQuery from '../graphql/session.graphql';
import useHeaderRight from '../hooks/header_right_session';
import useHeaderScroll from '../hooks/header_scroll';
import callHandler from '../lib/call_handler';
import { dayMonth, time, addMinutes } from '../lib/date';
import sessionTitle from '../lib/session_title';
import { SessionScreenNavProp } from '../navigation/main';
import style, { headerOptions } from '../style/session';
import loaderStyle from '../style/loader';
import FastImage from 'react-native-fast-image';

export type SessionScreenNavParams = { nodeId: string };

const rescheduleHours = 24;

const Session = () => {
  const route = useRoute<SessionScreenNavProp>();
  const { nodeId: sessionId } = route.params;

  const {
    data: {
      sessionGet: {
        eventId,
        start,
        duration,
        status,
        sessionNo,
        notes,
        trainer: { facetimeId, skypeId, tel, user: { name, avatar } = {} } = {},
      } = {},
    } = {},
    refetch,
    loading,
  } = useQuery(SessionQuery, {
    variables: {
      id: sessionId,
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const { style: headerStyle, headerScrollPct, handleScroll } = useHeaderScroll(0.5);
  const { navigate } = useNavigation();

  const past = useMemo(() => {
    if (start === undefined) return null;
    const tsNow = new Date().getTime();
    const tsEnd = addMinutes(start, duration).getTime();
    return tsNow > tsEnd;
  }, [duration, start]);

  const rescheduleInactive = useMemo(() => {
    if (start === undefined) return null;
    if (status !== null) return true;
    const tsNow = new Date().getTime();
    const rescheduleUntil = new Date(start).getTime() - rescheduleHours * 60 * 60 * 1000;
    return tsNow > rescheduleUntil;
  }, [start, status]);

  useHeaderRight(sessionId, eventId, rescheduleInactive, start);

  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions(headerOptions);
  }, [setOptions]);

  function onPressCall() {
    const links = [`facetime:${facetimeId}`, `skype:${skypeId}`, `tel:${tel}`];
    callHandler(links);
  }
  function onPressTrainer() {
    navigate('OnboardTrainer1');
  }

  if (loading) {
    return <ActivityIndicator animating={loading} style={loaderStyle.loader} />;
  }

  const renderPastSessionNotes = () => {
    if (!past) {
      return null;
    }

    if (notes?.length > 0) {
      return (
        <SafeArea size="none">
          <Typography variant="title" centered style={{ marginTop: 10, marginBottom: 20 }}>
            Notes
          </Typography>
          {notes?.map(note => (
            <FeedListItem item={{ ...note, sessionNumber: sessionNo }} />
          ))}
        </SafeArea>
      );
    }

    return (
      <SafeArea size="none">
        <Typography variant="title" centered style={{ marginBottom: 30 }}>
          No notes for this session
        </Typography>
      </SafeArea>
    );
  };

  return (
    <View style={headerStyle.container} key={sessionNo}>
      <View style={headerStyle.header}>
        <FastImage
          style={{
            ...headerStyle.background,
            opacity: 1 - headerScrollPct,
          }}
          source={{ uri: avatar }}
        />
      </View>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }} onScroll={handleScroll} scrollEventThrottle={1}>
        {past !== true && (
          <View style={{ ...headerStyle.overlay, transform: [{ translateY: -30 }] }}>
            <SafeArea vSize="none" size="lg">
              <Button onPress={onPressCall}>Start videocall</Button>
            </SafeArea>
          </View>
        )}
        <View style={headerStyle.content}>
          <SafeArea size="lg">
            <Text adjustsFontSizeToFit numberOfLines={1} style={style.sessionTitle}>
              {sessionTitle(sessionNo)}
            </Text>
            <Typography variant="heading" centered>
              {dayMonth(start)}
              ,&nbsp;
              {time(start)}
              &nbsp;-&nbsp;
              {time(addMinutes(start, duration))}
            </Typography>
            <TouchableOpacity style={{ marginTop: 25 }} onPress={onPressTrainer}>
              <Row justifyContent="center">
                <Avatar src={{ uri: avatar }} />
                <Typography variant="link" centered style={{ marginLeft: 10 }}>
                  {`With  ${name}`}
                </Typography>
              </Row>
            </TouchableOpacity>

            {!past && (
              <>
                <Typography variant="title" centered style={{ marginTop: 60 }}>
                  Preparation
                </Typography>

                <Typography centered style={{ marginTop: 10 }}>
                  Make sure your phone is charged. Find a comfortable and quiet space. A session works best if you have
                  a pair of headphones. If you want to call using your computer, you can Facetime
                  {` ${name} `}
                  by calling
                  {` ${facetimeId} `}
                  in the Facetime app on your computer.
                </Typography>
              </>
            )}
          </SafeArea>

          {renderPastSessionNotes()}
        </View>
      </ScrollView>
    </View>
  );
};

export default Session;
