import ColorPalette from '@Constants/colors';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import HeaderRightDots from '@Components/HeaderRightDots';
import { Screen } from '@Screens/index';

const actionSheetConfig = {
  options: ['Edit', 'Cancel'],
  cancelButtonIndex: 1,
};

function useHeaderRight(nodeId: string, serializedPayload: string) {
  const { showActionSheetWithOptions } = useActionSheet();

  const { navigate, setOptions } = useNavigation();

  function setHeaderRight() {
    function onActionSheetPress(buttonIndex: number) {
      if (buttonIndex === actionSheetConfig.cancelButtonIndex) return;
      navigate(Screen.NoteAdd, { nodeId, serializedPayload });
    }
    function onHeaderRightPress() {
      showActionSheetWithOptions(actionSheetConfig, onActionSheetPress);
    }
    setOptions({
      headerRight: () => <HeaderRightDots color={ColorPalette.blue} onPress={onHeaderRightPress} />,
    });
  }
  return useEffect(setHeaderRight, [navigate, nodeId, serializedPayload, setOptions, showActionSheetWithOptions]);
}

export default useHeaderRight;
