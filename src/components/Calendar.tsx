import { startOfMonth, endOfMonth, format } from 'date-fns';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Calendar as NativeCalendar } from 'react-native-calendars';
import { BasicDayProps } from 'react-native-calendars/src/calendar/day/basic';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { DateData, DayState } from 'react-native-calendars/src/types';

import ColorPalette from '../constants/colors';
import { formatDateWithTZ, formatYearMonth, ISOFormat, tomorrowWithTimeZone, yearMonthDayFormat } from '../lib/date';

export interface CalendarMarkedDateProps {
  [key: string]: MarkingProps;
}

const styles = StyleSheet.create({
  dayContainer: {
    width: 27,
    height: 27,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: ColorPalette.primary,
    fontSize: 14,
  },
  selectedDayContainer: {
    backgroundColor: ColorPalette.primary,
    width: 27,
    height: 27,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 0,
  },
  selectedDayText: {
    color: ColorPalette.white,
  },
  dotContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 27,
    top: 30,
  },
  dotContainerWithBothDots: {
    justifyContent: 'space-between',
    width: 14,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 8,
    backgroundColor: ColorPalette.primary,
  },
  disabledDay: {
    color: ColorPalette.gray200,
  },
});

interface Marking {
  marked?: boolean;
  selected?: boolean;
}

export interface DayComponentProps {
  date: DateData;
  state: DayState;
  marking?: Marking;
}

interface CalendarProps {
  setStartDate: (arg: string) => void;
  selectedDay: DateData | Partial<DateData>;
  changeSelectedDay: (arg: DateData | Partial<DateData>) => void;
  availableDays: string[];
  markedDates: CalendarMarkedDateProps;
  sessionToRescheduledStart: string;
}

const Calendar = ({
  setStartDate,
  selectedDay,
  changeSelectedDay,
  availableDays,
  markedDates,
  sessionToRescheduledStart,
}: CalendarProps) => {
  const currentDay = sessionToRescheduledStart
    ? formatDateWithTZ(sessionToRescheduledStart, yearMonthDayFormat)
    : tomorrowWithTimeZone;

  const defaultMonthLastDay = endOfMonth(new Date(currentDay));

  const [lastDayOfMonth, setLastDayOfMonth] = useState(formatDateWithTZ(defaultMonthLastDay, yearMonthDayFormat));
  const [currentMonth, setCurrentMonth] = useState(currentDay);

  const renderDayView = ({ state, marking, date }: BasicDayProps) => {
    const dateAsString = date?.dateString || '';
    const hasSelectedTime = marking?.marked;
    const bookedPreviously = marking?.selected;

    const isUnavailableDate = !availableDays.includes(dateAsString);
    const isDisabled = state === 'disabled' || isUnavailableDate;

    const isDayToReschedule = currentDay === dateAsString;

    const getIsSelected = () => {
      if (selectedDay.dateString) {
        return date?.dateString === selectedDay.dateString;
      }

      if (isDayToReschedule) {
        return true;
      }

      return false;
    };

    const isSelectedAndBooked = bookedPreviously && hasSelectedTime;

    const isSelected = getIsSelected();

    return (
      <>
        <Pressable
          style={[styles.dayContainer, isSelected && styles.selectedDayContainer]}
          onPress={() => {
            if (state !== 'disabled' && date?.dateString) {
              changeSelectedDay(date);
            }
          }}
        >
          <Text style={[styles.dayText, isDisabled && styles.disabledDay, isSelected && styles.selectedDayText]}>
            {String(date?.day)}
          </Text>
        </Pressable>

        <View style={[styles.dotContainer, isSelectedAndBooked && styles.dotContainerWithBothDots]}>
          {hasSelectedTime && <View style={styles.blueDot} />}
        </View>
      </>
    );
  };

  const onMonthChange = (date: DateData) => {
    const selectedMonth = new Date(date.dateString);
    const startOfSelectedMonth = startOfMonth(selectedMonth);
    const lastDayOfMonthAsDate = endOfMonth(new Date(date.dateString));

    setCurrentMonth(date.dateString);

    setLastDayOfMonth(formatDateWithTZ(lastDayOfMonthAsDate, yearMonthDayFormat));

    setStartDate(format(startOfSelectedMonth, ISOFormat));

    if (formatYearMonth(selectedMonth) !== formatYearMonth(new Date()) || sessionToRescheduledStart) {
      return changeSelectedDay({ dateString: undefined });
    }

    return changeSelectedDay(date);
  };

  const validateIsFutureMonth = () => {
    const selectedMonth = formatYearMonth(new Date(currentMonth));
    const currentMonthString = formatYearMonth(new Date());

    return new Date(selectedMonth) > new Date(currentMonthString);
  };

  const isFutureMonth = validateIsFutureMonth();

  return (
    <NativeCalendar
      style={{
        marginTop: 20,
        width: '100%',
        marginBottom: 20,
      }}
      firstDay={1}
      minDate={tomorrowWithTimeZone}
      current={sessionToRescheduledStart ? currentMonth : tomorrowWithTimeZone}
      maxDate={lastDayOfMonth}
      markedDates={markedDates}
      allowSelectionOutOfRange={false}
      dayComponent={renderDayView}
      onMonthChange={onMonthChange}
      hideExtraDays={false}
      disabledDaysIndexes={[5, 6]}
      onPressArrowLeft={subtractMonth => {
        if (isFutureMonth) {
          subtractMonth();
        }
      }}
      onPressArrowRight={addMonth => addMonth()}
      disableArrowLeft={!isFutureMonth}
      theme={{
        arrowColor: 'black',
        arrowHeight: 30,
        textMonthFontSize: 18,
        textMonthFontFamily: 'graphikMedium',
        monthTextColor: 'black',
        'stylesheet.calendar.main': {
          week: {
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '140%',
          },
        },
        'stylesheet.calendar.header': {
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 10,
          },
          dayTextAtIndex5: {
            display: 'none',
          },
          dayTextAtIndex6: {
            display: 'none',
          },
        },
      }}
    />
  );
};

export default Calendar;
