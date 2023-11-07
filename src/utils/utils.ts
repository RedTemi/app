import { SessionsNextQuery } from '../graphql/types.generated';
import { constructListWithDateProp, sortByStart } from '../lib/array';

export const getNextSession = (sessionList: SessionsNextQuery['sessionListAsParticipant'][number][]) => {
  const sessionListSorted = constructListWithDateProp(sessionList, 'start').sort(sortByStart);
  const currentDate = new Date();

  currentDate.setMinutes(currentDate.getMinutes() - 30);
  const timestamp = currentDate.getTime();

  return sessionListSorted.find(({ start }) => Number(start) >= timestamp);
};

export const getCycleNo = (index: number, cycleBreaks: number[]) => {
  const cycleBreakNextToCurrentIndex = cycleBreaks.findIndex(sessionIndex => sessionIndex <= index);
  if (cycleBreakNextToCurrentIndex === -1) {
    return cycleBreaks.length + 1;
  }
  return cycleBreakNextToCurrentIndex + 1;
};
