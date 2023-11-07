import React, { useEffect } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import HeaderRightDots from '../components/header_right_dots';
import useSessionDisable from './session_disable';
import { Screen } from '../screens/index';

const actionSheetConfig = {
  options: ['Reschedule session', 'Delete session', 'Cancel'],
  cancelButtonIndex: 2,
};

function useHeaderRight(sessionId, eventId, inactive, sessionStart) {
  const sessionDisable = useSessionDisable(sessionId);
  const { showActionSheetWithOptions } = useActionSheet();
  const { navigate, setOptions } = useNavigation();
  useEffect(() => {
    async function onActionSheetPress(buttonIndex) {
      if (buttonIndex === actionSheetConfig.cancelButtonIndex) return;
      if (inactive === true) {
        Alert.alert('The timeframe for that option has passed.');
        return;
      }
      switch (buttonIndex) {
        default:
          return;
        case 0:
          navigate(Screen.SessionBook, { sessionStart, sessionId });
          break;
        case 1:
          await sessionDisable();
          navigate('Home');
          break;
      }
    }
    function onHeaderRightPress() {
      showActionSheetWithOptions(actionSheetConfig, onActionSheetPress);
    }
    setOptions({
      headerRight: () => <HeaderRightDots onPress={onHeaderRightPress} color="white" />,
    });
  }, [eventId, navigate, inactive, setOptions, showActionSheetWithOptions, sessionDisable]);
}

export default useHeaderRight;
