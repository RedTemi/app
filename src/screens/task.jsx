import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { View, TouchableOpacity, Image } from 'react-native';
import MutationTaskCloseAsParticipant from '../graphql/mutation.taskCloseAsParticipant.graphql';
import MutationTaskOpenAsParticipant from '../graphql/mutation.taskOpenAsParticipant.graphql';
import Background from '../components/background';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import TaskCheckbox from '../components/task_checkbox';
import X from '../assets/images/x.png';
import TaskAsParticipantQuery from '../graphql/query.taskAsParticipant.graphql';
import { useQuery } from '@apollo/client';

function Task({
  route: {
    params: { nodeId },
  },
}) {
  const { navigate } = useNavigation();
  const [taskCloseAsParticipant] = useMutation(MutationTaskCloseAsParticipant);
  const [taskOpenAsParticipant] = useMutation(MutationTaskOpenAsParticipant);

  const { data } = useQuery(TaskAsParticipantQuery, {
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
    navigate('NavTabs', { screen: 'Home' });
  };
  return (
    <Background color="primary" style={{ flex: 1 }}>
      <SafeArea size="lg" style={{ marginTop: 50 }}>
        <View style={{ marginLeft: 'auto' }}>
          <TouchableOpacity onPress={() => navigate('NavTabs', { screen: 'Home' })}>
            <Image source={X} />
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flex: 0.8, justifyContent: 'center' }}>
          <View style={{ marginBottom: 20 }}>
            <Typography color="white">{data?.taskAsParticipant?.description}</Typography>
          </View>
          <TaskCheckbox onPress={onPress} checked={checked} />
        </View>
      </SafeArea>
    </Background>
  );
}

export default Task;
