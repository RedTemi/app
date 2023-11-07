import { useMutation } from '@apollo/client';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { FocuscheckDeleteDocument } from '../graphql/types.generated';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import HeaderRightDots from '@Components/HeaderRightDots';
import { Screen } from '../screens/index';

const actionSheetConfig = {
  options: ['Edit', 'Delete', 'Cancel'],
  editButtonIndex: 0,
  destructiveButtonIndex: 1,
  cancelButtonIndex: 2,
};

const useHeaderRight = (nodeId: string) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { navigate, setOptions } = useNavigation();
  const [focuscheckDelete] = useMutation(FocuscheckDeleteDocument);

  const setHeaderRight = () => {
    const onActionSheetPress = async (buttonIndex: number) => {
      if (buttonIndex === actionSheetConfig.cancelButtonIndex) {
        return;
      }

      if (buttonIndex === actionSheetConfig.editButtonIndex) {
        navigate(Screen.FocusCheckStep1, { nodeId });
      }

      if (buttonIndex === actionSheetConfig.destructiveButtonIndex) {
        await focuscheckDelete({
          variables: {
            focusCheckId: nodeId,
          },
        });

        navigate(Screen.Tools);
      }
    };

    const onHeaderRightPress = () => {
      showActionSheetWithOptions(actionSheetConfig, onActionSheetPress);
    };

    const headerRight = () => {
      return <HeaderRightDots onPress={onHeaderRightPress} />;
    };

    setOptions({ headerRight });
  };

  return useEffect(setHeaderRight, [navigate, nodeId, setOptions, showActionSheetWithOptions]);
};

export default useHeaderRight;
