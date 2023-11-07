import { time, formatYearMonthDay } from '../lib/date';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { TimeToCancel } from '../screens/SessionBook';
import style from '../style/SessionBook';
interface SessionBookItemProps {
  start: string;
  sessionId?: string;
  isPreviouslyBooked: boolean;
  selectedTimes: string[];
  setSelectedTimes: Dispatch<SetStateAction<string[]>>;
  timesToCancel: TimeToCancel[];
  setTimesToCancel: Dispatch<SetStateAction<TimeToCancel[]>>;
  sessionToRescheduledStart?: string;
}

const SessionBookItem = ({
  start,
  selectedTimes,
  setSelectedTimes,
  sessionId,
  timesToCancel,
  setTimesToCancel,
  sessionToRescheduledStart,
}: SessionBookItemProps) => {
  const isReservedTime = selectedTimes.includes(start);
  const previouslybookedTimes = timesToCancel.map(item => item.sessionId);
  const isSessionToReschedule = sessionToRescheduledStart === start;

  const replaceSelectedTimeInDay = () => {
    const alreadySelectedTimeInSpecificDay = selectedTimes.find(item => {
      if (formatYearMonthDay(new Date(item)) === formatYearMonthDay(new Date(start))) {
        return item;
      }
      return;
    });

    const timesWithCurrentTimeRemoved = selectedTimes.filter(
      selectedTime => selectedTime !== alreadySelectedTimeInSpecificDay,
    );

    if (alreadySelectedTimeInSpecificDay === start) {
      return setSelectedTimes(timesWithCurrentTimeRemoved);
    }

    return setSelectedTimes([...timesWithCurrentTimeRemoved, start]);
  };

  const markTimeToCancel = () => {
    const timesToCancelCurrentTimeRemoved = timesToCancel.filter(selectedTime => selectedTime.start !== start);

    if (sessionId) {
      if (!previouslybookedTimes.includes(sessionId)) {
        return setTimesToCancel([...timesToCancel, { start, sessionId }]);
      }
      return setTimesToCancel(timesToCancelCurrentTimeRemoved);
    }
  };

  const onPress = () => {
    if (isSessionToReschedule) {
      return;
    }

    replaceSelectedTimeInDay();

    markTimeToCancel();
  };

  return (
    <TouchableOpacity
      key={start}
      onPress={onPress}
      style={{
        ...style.containerTime,
        ...(isReservedTime && style.reservedTime),
        ...(isSessionToReschedule && style.previouslyBookedTime),
      }}
      activeOpacity={isSessionToReschedule ? 1 : 0.2}
    >
      <Text style={{ ...style.timeText, ...(isReservedTime && !isSessionToReschedule && style.reservedTimeText) }}>
        {time(start)}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(SessionBookItem);
