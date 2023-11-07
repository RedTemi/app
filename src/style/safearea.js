import { StyleSheet } from 'react-native';

function getMarginSize(size) {
  switch (size) {
    case 'none':
      return 0;
    case 'xs':
      return 5;
    case 'sm':
      return 10;
    case 'lg':
      return 40;
    case 'xl':
      return 60;
    default:
      return 20;
  }
}

export default function style({ size, vSize, hSize }) {
  return StyleSheet.create({
    style: {
      flex: 1,
      margin: getMarginSize(size),
      ...(vSize ? { marginVertical: getMarginSize(vSize) } : {}),
      ...(hSize ? { marginHorizontal: getMarginSize(hSize) } : {}),
    },
  }).style;
}
