import { useRoute } from '@react-navigation/native';
import React from 'react';

import FocusCheckContainer from '@Components/FocusCheckContainer';
import { FocusCheckStep5ScreenProp } from '@Navigation/NavMain';
import { Screen } from '../screens/index';

export type FocusCheckStep5ScreenParams = { nodeId: string };

const FocusCheckStep5 = () => {
  const route = useRoute<FocusCheckStep5ScreenProp>();
  return (
    <FocusCheckContainer
      nodeId={route.params.nodeId}
      name="successCriteria"
      goto={Screen.Tools}
      title1="Define measurables"
      title2="Define three success criteria that represent the realisation of all intentions"
      btnTxt="Save"
    />
  );
};

export default FocusCheckStep5;
