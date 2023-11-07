import { useQuery } from '@apollo/client';
import { ToolsDocument, Note, Focuscheck, Session } from '../graphql/types.generated';
import { constructListWithDateProp, sortByCreatedAtDesc, sortByStart } from '../lib/array';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';

import EmptyState from '@Components/EmptyState';
import FeedListItem from '@Components/FeedListItem';
import SafeArea from '@Components/SafeArea';
import ScrollViewRefresh from '@Components/ScrollViewRefresh';
import Tool from '@Components/Tool';
import Typography, { TypographyVariant } from '@Components/Typography';

const setSessionNumber = (list: Array<Note | Focuscheck>, sessionList: Session[]) => {
  return list.map(item => {
    const { sessionId } = item;
    if (!sessionId) {
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
};

const makeFeedlist = (noteList: Note[], focuscheckList: Focuscheck[], sessionList: Session[]) => {
  const listMerged = [...noteList, ...focuscheckList];
  return setSessionNumber(
    constructListWithDateProp(listMerged, 'createdAt').sort(sortByCreatedAtDesc),
    constructListWithDateProp(sessionList, 'start').sort(sortByStart),
  );
};

const Tools = () => {
  const {
    data: {
      noteListAsParticipant: noteList = [],
      focuscheckListAsParticipant: focuscheckList = [],
      sessionListAsParticipant: sessionList = [],
    } = {},
    loading,
    refetch,
  } = useQuery(ToolsDocument);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const feedList = makeFeedlist(noteList, focuscheckList, sessionList);

  return (
    <View style={{ paddingTop: 20, flex: 1, backgroundColor: 'white' }}>
      <SafeArea>
        <ScrollViewRefresh loading={loading} refetch={refetch}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 20 }}>
            <Tool type="note" />
            <Tool type="focusCheck" />
            <Tool type="disciplineTest" />
          </ScrollView>

          <Typography variant={TypographyVariant.display50} centered style={{ marginTop: 40 }}>
            Feed
          </Typography>

          {feedList.map(item => (
            <FeedListItem item={item} />
          ))}

          <EmptyState list={feedList} text="Nothing here yet" />
        </ScrollViewRefresh>
      </SafeArea>
    </View>
  );
};

export default Tools;
