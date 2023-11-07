import { useMutation, useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import {
  TaskAsParticipantDocument,
  TaskCloseAsParticipantDocument,
  TaskOpenAsParticipantDocument,
} from '../graphql/types.generated';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import Background from '@Components/Background';
import Checkcircle from '@Components/IconComponents/CheckCircle';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import Images from '@Images/index';
import { TaskScreenProp } from '@Navigation/NavMain';
import { Screen } from '../screens/index';
import getStyles from '../style/TaskCheckbox';

export type TaskScreenParams = {
  nodeId: string;
};

const Task = () => {
  const { navigate } = useNavigation();
  const route = useRoute<TaskScreenProp>();

  const [taskCloseAsParticipant] = useMutation(TaskCloseAsParticipantDocument);
  const [taskOpenAsParticipant] = useMutation(TaskOpenAsParticipantDocument);
  const { container, title } = getStyles();

  const nodeId = route.params.nodeId;

  const { data } = useQuery(TaskAsParticipantDocument, {
    variables: {
      id: nodeId,
    },
  });

  const checked = data?.taskAsParticipant?.completedAt !== null;

  const onPress = async () => {
    if (checked === false) {
      await taskCloseAsParticipant({ variables: { id: nodeId } });
    } else {
      await taskOpenAsParticipant({ variables: { id: nodeId } });
    }
    navigate(Screen.NavTabs, { screen: Screen.Home });
  };
  return (
    <Background color={ColorPalette.primary} style={{ flex: 1 }}>
      <SafeArea size={SafeAreaSize.lg} style={{ marginTop: 50 }}>
        <View style={{ marginLeft: 'auto' }}>
          <TouchableOpacity onPress={() => navigate(Screen.NavTabs, { screen: Screen.Home })}>
            <Image source={Images.Close} />
          </TouchableOpacity>
        </View>

        <View style={{ display: 'flex', flex: 0.8, justifyContent: 'center' }}>
          <View style={{ marginBottom: 20 }}>
            <Typography variant={TypographyVariant.title} color={ColorPalette.white}>
              {data?.taskAsParticipant?.description}
            </Typography>
          </View>

          <TouchableOpacity onPress={onPress} style={container}>
            <Row style={{ flex: 1 }}>
              <Typography variant={TypographyVariant.title} color={ColorPalette.white} style={title}>
                Done
              </Typography>

              <Checkcircle checked={checked} />
            </Row>
          </TouchableOpacity>
        </View>
      </SafeArea>
    </Background>
  );
};

export default Task;
