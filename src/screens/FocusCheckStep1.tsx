import { useRoute } from '@react-navigation/native';
import React from 'react';

import FocusCheckContainer from '@Components/FocusCheckContainer';
import { FocusCheckStep1ScreenProp } from '@Navigation/NavMain';
import { Screen } from '../screens/index';

export type FocusCheckStep1ScreenParams = { nodeId: string };

const FocusCheckStep1 = () => {
  const route = useRoute<FocusCheckStep1ScreenProp>();

  return (
    <FocusCheckContainer
      nodeId={route.params?.nodeId || null}
      name="title"
      goto={Screen.FocusCheckStep2}
      title2="Name the project"
      desc="Name"
      placeholder="E.g. annual report"
    />
  );
};

export default FocusCheckStep1;
