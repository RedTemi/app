import AsyncStorage from '@react-native-async-storage/async-storage';

function storageGet(key) {
  return AsyncStorage.getItem(key);
}

function storageSet(key, value) {
  return AsyncStorage.setItem(key, value);
}

function storageRemove(key) {
  return AsyncStorage.removeItem(key);
}

// function storageClear() {
//   return AsyncStorage.clear();
// }

export {
  storageGet,
  storageSet,
  storageRemove,
  // storageClear,
};
