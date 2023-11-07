import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import HeaderRightDots from '../components/header_right_dots';
import { Screen } from '../screens/index';

const actionSheetConfig = {
  options: ['Edit', 'Cancel'],
  cancelButtonIndex: 1,
};

function useHeaderRight(nodeId, serializedPayload) {
  const { showActionSheetWithOptions } = useActionSheet();

  const { navigate, setOptions } = useNavigation();

  function setHeaderRight() {
    function onActionSheetPress(buttonIndex) {
      if (buttonIndex === actionSheetConfig.cancelButtonIndex) return;
      navigate(Screen.NoteAdd, { nodeId, serializedPayload });
    }
    function onHeaderRightPress() {
      showActionSheetWithOptions(actionSheetConfig, onActionSheetPress);
    }
    setOptions({
      headerRight: () => <HeaderRightDots color="blue" onPress={onHeaderRightPress} />,
    });
  }
  return useEffect(setHeaderRight, [navigate, nodeId, serializedPayload, setOptions, showActionSheetWithOptions]);
}

export default useHeaderRight;
