import { useMutation } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { TaskCloseAsParticipantDocument, TaskOpenAsParticipantDocument, Task } from '@Graphql/types.generated';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';

import Cell from '@Components/Cell';
import Checkcircle from '@Components/IconComponents/CheckCircle';
import Row from '@Components/Row';
import Typography, { TypographyVariant } from '@Components/Typography';
import { Screen } from '@Screens/index';
import getStyles from '@Styles/TaskContainer';

interface TaskContainerProps {
  task: Partial<Task>;
  refetch: () => void;
}

const TaskContainer = ({ task, refetch }: TaskContainerProps) => {
  const { navigate } = useNavigation();

  const [taskCloseAsParticipant] = useMutation(TaskCloseAsParticipantDocument);
  const [taskOpenAsParticipant] = useMutation(TaskOpenAsParticipantDocument);

  const { description, completedAt, nodeId } = task;
  const checked = Boolean(completedAt);

  const { container } = getStyles({ checked });

  const onCheckboxPress = async (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (!checked) {
      await taskCloseAsParticipant({ variables: { id: nodeId } });
    } else {
      await taskOpenAsParticipant({ variables: { id: nodeId } });
    }
    refetch();
  };

  const onPress = () => {
    const itemSerialized = JSON.stringify(task);
    navigate(Screen.Task, { itemSerialized });
  };

  return (
    <TouchableOpacity onPress={onPress} style={container}>
      <Row>
        <Cell shrink={1}>
          <View>
            <Typography
              variant={TypographyVariant.title}
              numberOfLines={1}
              color={checked ? ColorPalette.black : ColorPalette.white}
            >
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
};

export default TaskContainer;
