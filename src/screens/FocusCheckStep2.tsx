import { useRoute } from '@react-navigation/native';
import React from 'react';

import FocusCheckContainer from '@Components/FocusCheckContainer';
import { FocusCheckStep2ScreenProp } from '@Navigation/NavMain';
import { Screen } from '../screens/index';

export type FocusCheckStep2ScreenParams = { nodeId: string };

const FocusCheckStep2 = () => {
  const route = useRoute<FocusCheckStep2ScreenProp>();

  return (
    <FocusCheckContainer
      nodeId={route.params.nodeId}
      name="intentionForMe"
      goto={Screen.FocusCheckStep3}
      title1="Intention for me"
      title2="What should this project fulfill for me?"
      desc="Answer in single words or very short sentences."
      placeholder="Collaboration, acknowledgement"
    />
  );
};

export default FocusCheckStep2;
