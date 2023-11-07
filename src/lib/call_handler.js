import * as Linking from 'expo-linking';
import errorHandler from './error_handler';

function canOpenLink(link) {
  if (link.endsWith('undefined')) return false;
  return Linking.canOpenURL(link);
}

function callHandler(links) {
  Promise.all(links.map(canOpenLink))
    .then((linksSupported) => linksSupported.findIndex((linkSupport) => linkSupport === true))
    .then((index) => {
      if (index === -1) {
        errorHandler('No call URL supported.');
        return;
      }
      const link = links[index];
      Linking.openURL(link).catch(errorHandler);
    });
}

export default callHandler;
