import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { startOfMonth, isSameDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DateData } from 'react-native-calendars/src/types';

import Button from '../components/button';
import Calendar, { CalendarMarkedDateProps } from '../components/Calendar';
import Loader from '../components/Loader';
import SafeArea from '../components/safearea';
import SessionBookList from '../components/session_book_list';
import Typography from '../components/typography';
import { useSessionBookTime } from '../context/SessionBookTimeContext';
import SessionDisable from '../graphql/mutation.session_disable.graphql';
import SessionBookMultipleMutation from '../graphql/mutation.sessionBookMultiple.graphql';
import useAvailability from '../hooks/availability';
import {
  ISOFormat,
  timezone,
  tomorrowWithTimeZone,
  yearMonthDayFormat,
  formatDateWithTZ,
  tomorrowStartISO,
  formatYearMonthDay,
} from '../lib/date';
import { Screen } from '../screens/index';
import { SessionsBookScreenDocument, SessionsBookScreenQuery } from '../../types.generated';

export interface DataListItem {
  key: string;
  list: Record<string, unknown>[];
  sessionId?: string;
}

export interface DateDisplayed {
  start: string;
  isPreviouslyBooked?: boolean;
  nodeId?: string;
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
      const availableDay = utcToZonedTime(item.start, timezone);

      return isSameDay(availableDay, utcToZonedTime(currentSelectedDayFormatted, timezone));
    })
    .map(item => {
      return { start: item.start, sessionId: hasSessionId ? item.nodeId : undefined };
    });
};

const SessionBook = () => {
  const route = useRoute();
  const sessionToRescheduledStart = route.params?.sessionStart;
  const sessionToRescheduledId = route.params?.sessionId;

  const defaultStartDate = sessionToRescheduledStart
    ? formatDateWithTZ(startOfMonth(new Date(sessionToRescheduledStart)), ISOFormat)
    : tomorrowStartISO;

  const [startDate, setStartDate] = useState(defaultStartDate);

  const [selectedDay, changeSelectedDay] = useState<DateData | Partial<DateData>>({
    dateString: sessionToRescheduledStart
      ? formatDateWithTZ(sessionToRescheduledStart, yearMonthDayFormat)
      : tomorrowWithTimeZone,
  });

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const [timesToCancel, setTimesToCancel] = useState<TimeToCancel[]>([]);
  const [isCancellingSessions, setIsCancellingSessions] = useState(false);

  const { loading: isLoadingAvailability, refetch, trainerAvailability } = useAvailability(startDate);

  const { data: { sessionListAsParticipant: sessionList = [] } = {}, loading: isLoadingSessionList } =
    useQuery<SessionsBookScreenQuery>(SessionsBookScreenDocument);

  const { navigate } = useNavigation();
  const [sessionBookMultipleMutation, { loading: isPostingBookings }] = useMutation(SessionBookMultipleMutation);
  const [sessionDisable] = useMutation(SessionDisable);

  const { isOnboarding } = useSessionBookTime();

  const previouslyBookedDaysFromToday = sessionList.filter(
    session => utcToZonedTime(session.start, timezone) >= utcToZonedTime(tomorrowWithTimeZone, timezone),
  );

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

    const timesToCancelIds = (timesToCancel || []).map(item => item.sessionId);

    const timesToCancelWithSessionToReschedule = sessionToRescheduledId
      ? [...timesToCancelIds, sessionToRescheduledId]
      : timesToCancelIds;

    const constructPromises = () => {
      return timesToCancelWithSessionToReschedule.map(sessionId => sessionDisable({ variables: { id: sessionId } }));
    };

    return Promise.all(constructPromises());
  };

  const onCancelSessionsPress = async () => {
    setIsCancellingSessions(true);

    await onDisableClick();

    navigate('Sessions');

    setIsCancellingSessions(false);
  };

  const onBookSessionsPress = async () => {
    setIsCancellingSessions(true);

    await onDisableClick();

    await sessionBookMultipleMutation({
      variables: {
        timeList: timesForNewBooking,
      },
    });

    if (isOnboarding) {
      return navigate(Screen.OnboardFinish);
    }

    navigate('Sessions');

    setIsCancellingSessions(false);
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
    if (!selectedDay.dateString) {
      setSelectedDayTimeList([]);
      return;
    }

    const availableBookingTimes = filterTimesWithinSelectedDay(trainerAvailability, selectedDay.dateString);
    const timesToCancelList = filterTimesWithinSelectedDay(sessionList, selectedDay.dateString, true);

    const bookedAndAvailableTimes = new Set([...availableBookingTimes, ...timesToCancelList]);

    const sortedTimes = [...bookedAndAvailableTimes].sort(
      (a, b) => Number(new Date(a.start)) - Number(new Date(b.start)),
    );

    setSelectedDayTimeList([...sortedTimes]);
  }, [selectedDay.dateString, trainerAvailability, sessionList]);

  const availableDays = useMemo(() => {
    return filterAvailableDays();
  }, [filterAvailableDays, trainerAvailability]);

  const constructMarkedDates = () => {
    const markedDates: CalendarMarkedDateProps = {};

    selectedTimes.forEach(item => {
      const key = formatYearMonthDay(utcToZonedTime(item, timezone));
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
      <SafeArea size="xs" style={{ marginTop: 70, marginBottom: 0, paddingBottom: 0 }}>
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

        {(isLoadingAvailability || isLoadingSessionList || isPostingBookings || isCancellingSessions) && (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 70 }}>
            <Loader />
          </View>
        )}

        {Boolean(!selectedDayTimeList.length) &&
          Boolean(!timesToCancelForToday.length) &&
          selectedDay.dateString &&
          !isLoadingAvailability &&
          !isLoadingSessionList && (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
              <Typography variant="title" style={{ fontWeight: '600' }} centered>
                Sorry, no available times
              </Typography>
            </View>
          )}

        {!selectedDay.dateString && !isLoadingAvailability && !isLoadingSessionList && (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
            <Typography variant="title" style={{ fontWeight: '600' }} centered>
              Select a specific day
            </Typography>
          </View>
        )}

        {!isLoadingAvailability &&
          Boolean(selectedDayTimeList.length) &&
          !isPostingBookings &&
          !isCancellingSessions && (
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
            <Button color="primary" onPress={onBookSessionsPress} disabled={isCancellingSessions || isPostingBookings}>
              <Text>Book sessions</Text>
            </Button>
          </View>
        )}

        {Boolean(!timesForNewBooking.length) && Boolean(timesToCancel.length) && (
          <View style={{ marginTop: 'auto' }}>
            <Button color="primary" onPress={onCancelSessionsPress} disabled={isCancellingSessions}>
              <Text>Cancel Sessions</Text>
            </Button>
          </View>
        )}
      </SafeArea>
    </ScrollView>
  );
};

export default SessionBook;
