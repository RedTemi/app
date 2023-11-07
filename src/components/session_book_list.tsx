import React, { Dispatch, memo, SetStateAction } from 'react';
import { View } from 'react-native';
import { DateDisplayed, TimeToCancel } from '../screens/session_book';

import SessionBookItem from './session_book_item';

interface SessionBookListProps {
  list?: DateDisplayed[];
  selectedTimes: string[];
  setSelectedTimes: Dispatch<SetStateAction<string[]>>;
  timesToCancel: TimeToCancel[];
  setTimesToCancel: Dispatch<SetStateAction<TimeToCancel[]>>;
  sessionToRescheduledStart: string;
}

const SessionBookList = ({
  list,
  selectedTimes,
  setSelectedTimes,
  timesToCancel,
  setTimesToCancel,
  sessionToRescheduledStart,
}: SessionBookListProps) => {
  return (
    <View style={{ flex: 1, marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
      {list?.map((item, index) => {
        return (
          <SessionBookItem
            key={`${item.start}${index}`}
            start={item.start}
            sessionId={item.sessionId}
            sessionToRescheduledStart={sessionToRescheduledStart}
            isPreviouslyBooked={Boolean(item.isPreviouslyBooked)}
            selectedTimes={selectedTimes}
            timesToCancel={timesToCancel}
            setSelectedTimes={setSelectedTimes}
            setTimesToCancel={setTimesToCancel}
          />
        );
      })}
    </View>
  );
};

export default memo(SessionBookList);
