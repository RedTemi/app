import { StyleSheet } from 'react-native';

import colors from '../constants/colors';

export default StyleSheet.create({
  safeArea: {
    marginTop: 60,
  },
  containerTime: {
    alignItems: 'center',
    width: '27.33%',
    borderWidth: 1,
    padding: 8,
    margin: '3%',
    marginBottom: '1%',
  },
  timeText: {
    color: colors.black,
  },
  dayTitle: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  reservedTime: {
    backgroundColor: colors.primary,
  },
  reservedTimeText: {
    color: colors.white,
  },
  previouslyBookedTime: {
    backgroundColor: colors.gray200,
  },
});
