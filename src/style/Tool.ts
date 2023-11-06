import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  box: {
    flex: 1,
    top: 20,
    width: 280,
    height: 360,
    margin: 10,
    padding: 20,
  },
  box1: {
    backgroundColor: ColorPalette.primary,
  },
  box2: {
    backgroundColor: ColorPalette.peach,
  },
  box3: {
    backgroundColor: ColorPalette.black,
    paddingRight: 0,
    paddingTop: 30,
    marginRight: 40,
  },
  bgImg1: {
    width: 223,
    height: 235,
  },
  bgImg2: {
    width: 246,
    height: 142,
  },
  bgImg3: {
    width: 260,
    height: 251,
  },
  txtContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  txtWhite: {
    color: ColorPalette.white,
  },
});
