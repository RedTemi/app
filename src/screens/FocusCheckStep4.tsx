import { useRoute } from '@react-navigation/native';
import React from 'react';

import FocusCheckContainer from '@Components/FocusCheckContainer';
import { FocusCheckStep4ScreenProp } from '@Navigation/NavMain';
import { Screen } from '@Screens/index';

export type FocusCheckStep4ScreenParams = { nodeId: string };

const FocusCheckStep4 = () => {
  const route = useRoute<FocusCheckStep4ScreenProp>();
  return (
    <FocusCheckContainer
      nodeId={route.params.nodeId}
      name="investigation"
      goto={Screen.FocusCheckStep5}
      title1="Prioritize the questions"
      title2="Which three questions need to be answered to realize all the intentions?"
    />
  );
};

export default FocusCheckStep4;
