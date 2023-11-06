import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

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
    color: ColorPalette.black,
  },
  dayTitle: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  reservedTime: {
    backgroundColor: ColorPalette.primary,
  },
  reservedTimeText: {
    color: ColorPalette.white,
  },
  previouslyBookedTime: {
    backgroundColor: ColorPalette.gray200,
  },
});
