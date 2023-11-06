import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.peach,
    padding: 40,
  },
  containerQ: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorPalette.peach,
  },
  introTxt: {
    paddingTop: 20,
    paddingBottom: 60,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 144,
    width: '100%',
    flexShrink: 1,
  },
  pretitle: {
    width: '100%',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  title: {
    width: '100%',
    fontSize: 28,
    fontWeight: 'normal',
    paddingHorizontal: 40,
  },
  content: {
    flex: 1,
    width: '100%',
    marginBottom: 60,
    backgroundColor: ColorPalette.white,
    padding: 25,
  },
  question: {
    fontSize: 16,
    paddingBottom: 12,
  },
  answer: {
    flex: 1,
    fontSize: 16,
  },
  nextButton: {
    color: ColorPalette.primary,
  },
});

export default style;
