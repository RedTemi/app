import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { sortByCreatedAtDesc } from '../lib/array';
import SafeArea from './safearea';
import TaskBox from './task_box';
import EmptyState from './empty';

function TaskList({ list, refetch }) {
  const taskList = [...list];
  return (
    <SafeArea>
      <ScrollView>
        {taskList.sort(sortByCreatedAtDesc).map((task) => (
          <TaskBox key={task.nodeId} task={task} refetch={refetch} />
        ))}
      </ScrollView>
      <EmptyState list={list} text="You have no tasks" />
    </SafeArea>
  );
}

TaskList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    nodeId: PropTypes.string.isRequired,
  })).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default TaskList;
