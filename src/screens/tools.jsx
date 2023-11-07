import { useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import React, { useMemo, useCallback } from 'react';
import { View, ScrollView } from 'react-native';

import EmptyState from '../components/empty';
import FeedListItem from '../components/FeedListItem';
import SafeArea from '../components/safearea';
import ScrollViewRefresh from '../components/scrollview_refresh';
import Tool from '../components/tool';
import Typography from '../components/typography';
import queryTools from '../graphql/tools.graphql';
import { dateStrToDateObject, sortByCreatedAtDesc, sortByStart } from '../lib/array';
import style from '../style/tools';

function setSessionNumber(list, sessionList) {
  return list.map((item) => {
    const { sessionId } = item;
    if (sessionId === null) {
      return {
        ...item,
        sessionNumber: null,
      };
    }
    const index = sessionList.findIndex(({ nodeId }) => nodeId === sessionId);
    const sessionNumber = index === -1 ? null : index + 1;
    return {
      ...item,
      sessionNumber,
    };
  });
}

function makeFeedlist(noteList, focuscheckList, sessionList) {
  const listMerged = [...noteList, ...focuscheckList];
  return setSessionNumber(
    dateStrToDateObject(listMerged, 'createdAt').sort(sortByCreatedAtDesc),
    dateStrToDateObject(sessionList, 'start').sort(sortByStart),
  );
}

const Tools = () => {
  const {
    data: {
      noteListAsParticipant: noteList = [],
      focuscheckListAsParticipant: focuscheckList = [],
      sessionListAsParticipant: sessionList = [],
    } = {},
    loading,
    refetch,
  } = useQuery(queryTools);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const feedList = makeFeedlist(noteList, focuscheckList, sessionList);

  return (
    <View style={{ paddingTop: 20, flex: 1, backgroundColor: 'white' }}>
      <SafeArea size="none">
        <ScrollViewRefresh loading={loading} refetch={refetch}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 20 }}>
            <Tool type="note" />
            <Tool type="fc" />
            <Tool type="dt" />
          </ScrollView>
          <Typography variant="display3" centered style={style.display3}>
            Feed
          </Typography>
          {feedList.map((item) => (
            <FeedListItem item={item} />
          ))}
          <EmptyState list={feedList} text="Nothing here yet" />
        </ScrollViewRefresh>
      </SafeArea>
    </View>
  );
};

export default Tools;
