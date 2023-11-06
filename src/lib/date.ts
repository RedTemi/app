import { addDays, format, startOfDay } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import * as Localization from 'expo-localization';
import * as RNLocalize from 'react-native-localize';

import { uniqueValues } from './array';
import './intl';

export const yearMonthFormat = 'yyyy-MM';
export const yearMonthDayFormat = 'yyyy-MM-dd';
export const ISOFormat = "yyyy-MM-dd'T'HH:mm:ss'Z'";

export const timezone = RNLocalize.getTimeZone();

export const tomorrow = addDays(new Date(), 1);
export const tomorrowStart = startOfDay(addDays(new Date(), 1));

export const tomorrowWithTimeZone = formatInTimeZone(tomorrow, timezone, yearMonthDayFormat);
export const tomorrowWithTimeZoneISO = formatInTimeZone(tomorrow, timezone, ISOFormat);
export const tomorrowStartISO = formatInTimeZone(tomorrowStart, timezone, ISOFormat);

const locales = uniqueValues([...Localization.locales, 'en-US', 'da-DK']) as string[];

export const formatDateWithTZ = (date: string | Date, dateFormat: typeof yearMonthDayFormat | typeof ISOFormat) => {
  return formatInTimeZone(date, timezone, dateFormat);
};

const dtf = {
  time: new Intl.DateTimeFormat(locales, {
    hour: 'numeric',
    minute: 'numeric',
  }),
  dayMonth: new Intl.DateTimeFormat(locales, {
    month: 'long',
    day: 'numeric',
  }),
  dayMonthShort: new Intl.DateTimeFormat(locales, {
    month: 'short',
    day: 'numeric',
  }),
  dayMonthWeekday: new Intl.DateTimeFormat(locales, {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }),
  weekday: new Intl.DateTimeFormat(locales, {
    weekday: 'long',
  }),
  monthYear: new Intl.DateTimeFormat(locales, {
    month: 'long',
    year: 'numeric',
  }),
  yearMonthDay: new Intl.DateTimeFormat(locales, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }),
};

function isValidDate(d: Date) {
  return Number.isNaN(d.getDate()) === false;
}

function dateStringToDate(dateString: string | number | Date) {
  const d = new Date(dateString);
  return isValidDate(d) === true ? d : new Date();
}

export function dayMonth(dateString: string) {
  return dtf.dayMonth.format(dateStringToDate(dateString));
}

export function dayMonthShort(dateString: string) {
  return dtf.dayMonthShort.format(dateStringToDate(dateString));
}

export function dayMonthWeekday(dateString: string) {
  return dtf.dayMonthWeekday.format(dateStringToDate(dateString));
}

export function weekday(dateString: string) {
  return dtf.weekday.format(dateStringToDate(dateString));
}

export function monthYear(dateString: string) {
  return dtf.monthYear.format(dateStringToDate(dateString));
}

export function time(date: string | Date) {
  const dateToFormat = typeof date === 'string' ? dateStringToDate(date) : date;
  return dtf.time.format(dateToFormat);
}

export function yearMonthDay(dateString: string) {
  return dtf.yearMonthDay.format(dateStringToDate(dateString));
}

function minutesToMilliseconds(minutes: number) {
  return minutes * 60000;
}

export function addMinutes(dateString: string, minutes: number) {
  return new Date(dateStringToDate(dateString).getTime() + minutesToMilliseconds(minutes));
}

export function isSameDay(d1Str: string, d2Str: string) {
  return new Date(d1Str).getDay() === new Date(d2Str).getDay();
}

export const formatYearMonth = (date: Date) => format(date, yearMonthFormat);
export const formatYearMonthDay = (date: Date) => format(date, yearMonthDayFormat);

export const formatDayMonth = (date: Date) => format(date, 'dd LLLL');
export const formatHoursMinutes = (date: Date) => format(date, 'k:mm');
