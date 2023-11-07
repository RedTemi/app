import { useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { HomeDocument, HomeQuery } from '../graphql/types.generated';
import { sortByCreatedAtDesc } from '../lib/array';
import { storageGet, StorageKey } from '../lib/storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';

import EmptyState from '@Components/EmptyState';
import ImageAvatar from '@Components/ImageComponents/ImageAvatar';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import SessionNext from '@Components/SessionNext';
import TaskContainer from '@Components/TaskContainer';
import Typography, { TypographyVariant } from '@Components/Typography';
import useHeaderScroll from '../hooks/headerScroll';
import Images from '@Images/index';
import { Screen } from '../screens/index';
import StylesHome from '../style/Home';
import StylesLogo from '../style/Logo';

const Home = () => {
  const { style: headerStyle, headerScrollPct, handleScroll } = useHeaderScroll(0.75);
  const { navigate } = useNavigation();

  useEffect(() => {
    storageGet(StorageKey.onboardStatus).then(result => {
      if (result === null || result === '{}') {
        navigate(Screen.OnboardTerms);
      }
    });
  }, [navigate]);

  const {
    data: {
      participantGetAsParticipant: {
        trainer: { user: { name: trainerName = '', avatar: trainerAvatar = '' } = {} } = {},
      } = {},
      taskListAsParticipant: taskList = [],
    } = {},
    refetch,
  } = useQuery<HomeQuery>(HomeDocument);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  Alert.alert('Home render');

  return (
    <View style={headerStyle.container}>
      <View style={headerStyle.header}>
        <Image
          source={Images.LogoVerticalWhite}
          style={{ ...StylesLogo.verticalHome, opacity: 1 - headerScrollPct * 2 }}
        />
        <ImageAvatar source={{ uri: trainerAvatar }} style={{ opacity: 1 - headerScrollPct }} />
      </View>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }} onScroll={handleScroll} scrollEventThrottle={1}>
        <View style={{ ...headerStyle.overlay, transform: [{ translateY: -160 }] }}>
          <SafeArea size={SafeAreaSize.md} vSize={SafeAreaSize.none}>
            <Typography color={ColorPalette.white} style={StylesHome.headerOverlayTitle}>
              {`With ${trainerName}`}
            </Typography>
            <SessionNext />
          </SafeArea>
        </View>

        <View style={headerStyle.content}>
          <Typography variant={TypographyVariant.display50} centered style={{ marginTop: 30, marginBottom: 10 }}>
            Tasks
          </Typography>

          <SafeArea>
            <ScrollView>
              {[...taskList].sort(sortByCreatedAtDesc).map(task => (
                <TaskContainer key={task.nodeId} task={task} refetch={refetch} />
              ))}
            </ScrollView>

            <EmptyState list={taskList} text="You have no tasks" />
          </SafeArea>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
