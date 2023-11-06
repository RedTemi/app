import { useMutation, useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import {
  SessionBookMultipleDocument,
  SessionDisableDocument,
  SessionsBookScreenDocument,
  SessionsBookScreenQuery,
} from '@Graphql/types.generated';
import { dayMonth, formatYearMonthDay, ISOFormat, tomorrow } from '@Lib/date';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { format, getTime, parseISO, startOfMonth } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DateData } from 'react-native-calendars/src/types';

import Button from '@Components/Button';
import Calendar, { CalendarMarkedDateProps } from '@Components/Calendar';
import Loader from '@Components/Loader';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import SessionBookList from '@Components/SessionBookList';
import Typography, { TypographyVariant } from '@Components/Typography';
import { useSessionBookTime } from '@Context/SessionBookTimeContext';
import useAvailability from '@Hooks/availability';
import { SessionBookScreenProp } from '@Navigation/NavMain';
import { Screen } from '@Screens/index';

export type SessionBookScreenParams = {
  sessionStart: string;
  sessionId: string;
};

export interface DataListItem {
  key: string;
  list: Record<string, unknown>[];
  sessionId?: string;
}

export interface DateDisplayed {
  start: string;
  isPreviouslyBooked?: boolean;
  nodeId?: string;
  sessionId?: string;
}

export interface TimeToCancel {
  start: string;
  sessionId: string;
  nodeId?: string;
}

const filterTimesWithinSelectedDay = (
  timesList: DateDisplayed[],
  currentSelectedDayFormatted: string,
  hasSessionId = false,
) => {
  return timesList
    .filter(item => {
      const availableDay = formatYearMonthDay(parseISO(item.start));
      return availableDay === currentSelectedDayFormatted;
    })
    .map(item => {
      return { start: item.start, sessionId: hasSessionId ? item.nodeId : undefined };
    });
};

const SessionBook = () => {
  const route = useRoute<SessionBookScreenProp>();
  const sessionToRescheduledStart = route.params?.sessionStart;
  const sessionToRescheduledId = route.params?.sessionId;

  const defaultStartDate = sessionToRescheduledStart ? startOfMonth(new Date(sessionToRescheduledStart)) : tomorrow;

  const [startDate, setStartDate] = useState(format(defaultStartDate, ISOFormat));

  const [selectedDay, changeSelectedDay] = useState<DateData | Partial<DateData>>({
    timestamp: sessionToRescheduledStart ? getTime(new Date(sessionToRescheduledStart)) : getTime(tomorrow),
  });

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [timesToCancel, setTimesToCancel] = useState<TimeToCancel[]>([]);

  const { loading: isLoadingAvailability, refetch, trainerAvailability } = useAvailability(startDate);

  const { data: { sessionListAsParticipant: sessionList = [] } = {}, loading: isLoadingSessionList } =
    useQuery<SessionsBookScreenQuery>(SessionsBookScreenDocument);

  const { navigate } = useNavigation();
  const [sessionBookMultipleMutation, { loading: isPostingBookings }] = useMutation(SessionBookMultipleDocument);
  const [sessionDisable] = useMutation(SessionDisableDocument);

  const { isOnboarding } = useSessionBookTime();

  const previouslyBookedDaysFromToday = sessionList.filter(session => new Date(session.start) >= tomorrow);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const filterTimesWithoutCanceledTimes = () => {
    const timesToBeBooked = selectedTimes.filter(item => {
      const previouslybookedTime = timesToCancel.find(previousTime => previousTime.start === item);

      if (previouslybookedTime && previouslybookedTime.nodeId) {
        return undefined;
      }

      return item;
    });

    return timesToBeBooked;
  };

  const filterPreviouslyNotBookedTimes = (timesWithoutCanceledTimes: string[]) => {
    const previouslyBookedtimes = previouslyBookedDaysFromToday.map(item => item.start);

    const timesToBeBooked = timesWithoutCanceledTimes.filter(item => {
      if (previouslyBookedtimes.includes(item)) {
        return undefined;
      }

      return item;
    });

    return timesToBeBooked;
  };

  const timesWithoutCanceledTimes = filterTimesWithoutCanceledTimes();
  const timesForNewBooking = filterPreviouslyNotBookedTimes(timesWithoutCanceledTimes);

  const onDisableClick = async () => {
    if (!timesToCancel.length && !sessionToRescheduledId) {
      return;
    }

    const timesToCancelIds = timesToCancel.map(item => item.sessionId);

    const timesToCancelWithSessionToReschedule = sessionToRescheduledId
      ? [...timesToCancelIds, sessionToRescheduledId]
      : timesToCancelIds;

    const constructPromises = () => {
      return timesToCancelWithSessionToReschedule.map(sessionId => sessionDisable({ variables: { id: sessionId } }));
    };

    return Promise.all(constructPromises());
  };

  const onBookSessionsPress = async () => {
    await onDisableClick();

    await sessionBookMultipleMutation({
      variables: {
        timeList: timesForNewBooking,
      },
    });

    if (isOnboarding) {
      return navigate(Screen.OnboardFinish);
    }

    navigate(Screen.Sessions);
  };

  const [selectedDayTimeList, setSelectedDayTimeList] = useState<DateDisplayed[]>([]);

  const timesToCancelForToday = previouslyBookedDaysFromToday.filter(session => new Date(session.start) === new Date());

  const filterAvailableDays = () => {
    const allAvailableDays = trainerAvailability.map(item => {
      const dayStringAsDate = new Date(item.start);
      return formatYearMonthDay(dayStringAsDate);
    });

    const uniqueAvailableDays = new Set(allAvailableDays);

    return [...uniqueAvailableDays];
  };

  useEffect(() => {
    if (!selectedDay.timestamp) {
      setSelectedDayTimeList([]);
      return;
    }

    const currentSelectedDay = new Date(selectedDay.timestamp);
    const currentSelectedDayFormated = formatYearMonthDay(currentSelectedDay);

    const availableBookingTimes = filterTimesWithinSelectedDay(trainerAvailability, currentSelectedDayFormated);
    const timesToCancelList = filterTimesWithinSelectedDay(sessionList, currentSelectedDayFormated, true);

    const bookedAndAvailableTimes = new Set([...availableBookingTimes, ...timesToCancelList]);

    const sortedTimes = [...bookedAndAvailableTimes].sort(
      (a, b) => Number(new Date(a.start)) - Number(new Date(b.start)),
    );

    setSelectedDayTimeList([...sortedTimes]);
  }, [selectedDay.timestamp, trainerAvailability, sessionList]);

  const availableDays = useMemo(() => {
    return filterAvailableDays();
  }, [filterAvailableDays, trainerAvailability]);

  const constructMarkedDates = () => {
    const markedDates: CalendarMarkedDateProps = {};

    selectedTimes.forEach(item => {
      const key = formatYearMonthDay(new Date(item));
      markedDates[key] = { marked: true };
    });

    return markedDates;
  };

  const markedDates = constructMarkedDates();

  useEffect(() => {
    const preselectedTimes = previouslyBookedDaysFromToday.map(item => item.start);

    setSelectedTimes(preselectedTimes);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={{ flexGrow: 1 }}>
      <SafeArea size={SafeAreaSize.xs} style={{ marginTop: 70, marginBottom: 0, paddingBottom: 0 }}>
        <Calendar
          setStartDate={setStartDate}
          selectedDay={selectedDay}
          changeSelectedDay={changeSelectedDay}
          availableDays={availableDays}
          markedDates={markedDates}
          sessionToRescheduledStart={sessionToRescheduledStart}
        />

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginHorizontal: '10%',
            marginTop: 10,
            marginBottom: 20,
          }}
        />

        {(isLoadingAvailability || isLoadingSessionList || isPostingBookings) && (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 70 }}>
            <Loader />
          </View>
        )}

        {selectedDay.timestamp && !isLoadingAvailability && !isPostingBookings && (
          <TouchableOpacity onPress={onDisableClick}>
            <Typography variant={TypographyVariant.header} style={{ fontWeight: '600', marginBottom: 20 }} centered>
              {dayMonth(formatYearMonthDay(new Date(selectedDay.timestamp)))}
            </Typography>
          </TouchableOpacity>
        )}

        {Boolean(!selectedDayTimeList.length) &&
          Boolean(!timesToCancelForToday.length) &&
          selectedDay.timestamp &&
          !isLoadingAvailability &&
          !isLoadingSessionList && (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
              <Typography variant={TypographyVariant.title} style={{ fontWeight: '600' }} centered>
                Sorry, no available times
              </Typography>
            </View>
          )}

        {!selectedDay.timestamp && !isLoadingAvailability && !isLoadingSessionList && (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
            <Typography variant={TypographyVariant.title} style={{ fontWeight: '600' }} centered>
              Select a specific day
            </Typography>
          </View>
        )}

        {!isLoadingAvailability && Boolean(selectedDayTimeList.length) && !isPostingBookings && (
          <SessionBookList
            list={selectedDayTimeList}
            selectedTimes={selectedTimes}
            setSelectedTimes={setSelectedTimes}
            timesToCancel={timesToCancel}
            setTimesToCancel={setTimesToCancel}
            sessionToRescheduledStart={sessionToRescheduledStart}
          />
        )}

        {Boolean(timesForNewBooking.length) && (
          <View style={{ marginTop: 'auto' }}>
            <Button color={ColorPalette.primary} onPress={onBookSessionsPress} disabled={isPostingBookings}>
              <Text>Book sessions</Text>
            </Button>
          </View>
        )}
      </SafeArea>
    </ScrollView>
  );
};

export default SessionBook;
