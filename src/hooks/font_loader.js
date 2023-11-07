/* eslint-disable global-require */
import { useFonts } from 'expo-font';

const fontMap = {
  graphikRegular: require('../assets/fonts/Graphik/Graphik-Regular.otf'),
  graphikMedium: require('../assets/fonts/Graphik/Graphik-Medium.otf'),
  graphikSemibold: require('../assets/fonts/Graphik/Graphik-Semibold.otf'),
};

function useFontLoader() {
  const [loaded] = useFonts(fontMap);
  return loaded;
}

export default useFontLoader;
