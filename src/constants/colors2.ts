const ColorPalette = {
  tintColor: '#2f95dc',
  tabIconDefault: '#ccc',
  tabIconSelected: '#2f95dc',
  inactiveTintColor: '#000',
  activeTintColor: '#000',
  headerTintColor: '#000',
  tabBar: '#fefefe',
  danger: '#FF295C',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: '#2f95dc',
  noticeText: '#fff',
  primary: '#1029B9',
  secondary: '#fff',
  blue: '#1029B9',
  white: '#fff',
  black: '#000',
  muted: '#ACACAC',
  cyan: '#62CBC9',
  yellow: '#FAFF00',
  peach: '#FA9A7B',
  default: '#000',
  gray200: '#CCC',
  gray100: '#EEE',
  gray300: '#979797',
  transparent: 'transparent',
  red: '#FF0000',
};

export const Test = '2';

export type Color = typeof ColorPalette[keyof typeof ColorPalette];

export default ColorPalette;
