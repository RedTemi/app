import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKey {
  onboardStatus = 'onboardStatus',
}

const storageGet = (key: string) => {
  return AsyncStorage.getItem(key);
};

const storageSet = (key: string, value: string) => {
  return AsyncStorage.setItem(key, value);
};

const storageRemove = (key: string) => {
  return AsyncStorage.removeItem(key);
};

export { storageGet, storageSet, storageRemove };
