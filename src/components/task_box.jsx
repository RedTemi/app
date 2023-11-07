import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import MutationTaskCloseAsParticipant from '../graphql/mutation.taskCloseAsParticipant.graphql';
import MutationTaskOpenAsParticipant from '../graphql/mutation.taskOpenAsParticipant.graphql';
import getStyles from '../style/task_box';
import { Row, Cell } from './flexbox';
import Typography from './typography';
import Checkcircle from './checkcircle';

function TaskBox({ task, refetch }) {
  const { navigate } = useNavigation();
  const [taskCloseAsParticipant] = useMutation(MutationTaskCloseAsParticipant);
  const [taskOpenAsParticipant] = useMutation(MutationTaskOpenAsParticipant);
  const { description, completedAt, nodeId } = task;
  const checked = completedAt !== null;
  const { container } = getStyles({ checked });
  async function onCheckboxPress(e) {
    e.stopPropagation();
    if (checked === false) {
      await taskCloseAsParticipant({ variables: { id: nodeId } });
    } else {
      await taskOpenAsParticipant({ variables: { id: nodeId } });
    }
    refetch();
    return false;
  }
  function onPress() {
    navigate('Task', { nodeId });
  }
  return (
    <TouchableOpacity onPress={onPress} style={container}>
      <Row>
        <Cell shrink={1}>
          <View>
            <Typography numberOfLines={1} color={checked ? 'black' : 'white'}>
              {description}
            </Typography>
          </View>
        </Cell>
        <TouchableOpacity onPress={onCheckboxPress} style={{ padding: 20 }}>
          <Checkcircle checked={checked} />
        </TouchableOpacity>
      </Row>
    </TouchableOpacity>
  );
}

TaskBox.propTypes = {
  task: PropTypes.shape({
    nodeId: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completedAt: PropTypes.string,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default TaskBox;
