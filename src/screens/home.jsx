import { useQuery } from '@apollo/client';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';

import ImgAvatar from '../components/img-avatar';
import LogoVertical from '../components/logo_vertical';
import SafeArea from '../components/safearea';
import SessionNext from '../components/session_next';
import TaskList from '../components/task_list';
import Typography from '../components/typography';
import QueryHome from '../graphql/home.graphql';
import useHeaderScroll from '../hooks/header_scroll';
import { storageGet } from '../lib/storage';
import style from '../style/home';

function Home() {
  const { style: headerStyle, headerScrollPct, handleScroll } = useHeaderScroll(0.75);
  const { navigate } = useNavigation();
  useEffect(() => {
    storageGet('onboardStatus').then(result => {
      if (result === null || result === '{}') {
        navigate('OnboardTerms');
      }
    });
  }, [navigate]);
  const {
    data: {
      participantGetAsParticipant: {
        trainer: { user: { name: trainerName = '', avatar: trainerAvatar } = {} } = {},
      } = {},
      taskListAsParticipant: taskList = [],
    } = {},
    refetch,
  } = useQuery(QueryHome);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  return (
    <View style={headerStyle.container}>
      <View style={headerStyle.header}>
        <LogoVertical style={{ opacity: 1 - headerScrollPct * 2 }} />
        <ImgAvatar source={{ uri: trainerAvatar }} style={{ opacity: 1 - headerScrollPct }} />
      </View>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }} onScroll={handleScroll} scrollEventThrottle={1}>
        <View style={{ ...headerStyle.overlay, transform: [{ translateY: -160 }] }}>
          <SafeArea vSize="none">
            <Typography color="white" style={style.headerOverlayTitle}>
              {`With ${trainerName}`}
            </Typography>
            <SessionNext />
          </SafeArea>
        </View>
        <View style={headerStyle.content}>
          <Typography variant="display3" centered style={{ marginTop: 30, marginBottom: 10 }}>
            Tasks
          </Typography>
          <TaskList list={taskList} refetch={refetch} />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
