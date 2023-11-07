import { useActionSheet } from '@expo/react-native-action-sheet';
import ColorPalette from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import HeaderRightDots from '@Components/HeaderRightDots';
import useSessionDisable from '../hooks/sessionDisable';
import { Screen } from '../screens/index';

const actionSheetConfig = {
  options: ['Reschedule session', 'Delete session', 'Cancel'],
  cancelButtonIndex: 2,
};

const useHeaderRight = (sessionId: string, eventId: any, inactive: boolean | null, sessionStart: any) => {
  const sessionDisable = useSessionDisable(sessionId);
  const { showActionSheetWithOptions } = useActionSheet();
  const { navigate, setOptions } = useNavigation();

  useEffect(() => {
    const onActionSheetPress = async (buttonIndex: number) => {
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
          navigate(Screen.Home);
          break;
      }
    };
    const onHeaderRightPress = () => {
      showActionSheetWithOptions(actionSheetConfig, onActionSheetPress);
    };
    setOptions({
      headerRight: () => <HeaderRightDots onPress={onHeaderRightPress} color={ColorPalette.white} />,
    });
  }, [eventId, navigate, inactive, setOptions, showActionSheetWithOptions, sessionDisable]);
};

export default useHeaderRight;
