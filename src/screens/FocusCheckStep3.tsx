import { useRoute } from '@react-navigation/native';
import React from 'react';

import FocusCheckContainer from '@Components/FocusCheckContainer';
import { FocusCheckStep3ScreenProp } from '@Navigation/NavMain';
import { Screen } from '../screens/index';

export type FocusCheckStep3ScreenParams = { nodeId: string };

const FocusCheckStep3 = () => {
  const route = useRoute<FocusCheckStep3ScreenProp>();
  return (
    <FocusCheckContainer
      nodeId={route.params.nodeId}
      name="intentionForOthers"
      goto={Screen.FocusCheckStep4}
      title1="Intention for others"
      title2="What should this project fulfill for others?"
      desc="Answer in single words or very short sentences."
      placeholder="Collaboration, acknowledgement"
    />
  );
};

export default FocusCheckStep3;
