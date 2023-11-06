import errorHandler from '@Lib/errorHandler';
import { Linking } from 'react-native';

const canOpenLink = (link: string) => {
  if (link.endsWith('undefined')) return false;
  return Linking.canOpenURL(link);
};

const callHandler = (links: string[]) => {
  Promise.all(links.map(canOpenLink))
    .then(linksSupported => linksSupported.findIndex(linkSupport => linkSupport === true))
    .then(index => {
      if (index === -1) {
        errorHandler('No call URL supported.');
        return;
      }
      const link = links[index];
      Linking.openURL(link).catch(errorHandler);
    });
};

export default callHandler;
