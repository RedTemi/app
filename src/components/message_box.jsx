import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import getStyle from '../style/message_box';
import Background from './background';

function TaskBox({ isSender, children }) {
  const style = getStyle({ isSender });
  return (
    <Background color="yellow" style={style.container}>
      <Text style={style.body}>{children}</Text>
    </Background>
  );
}

TaskBox.defaultProps = {
  isSender: true,
};

TaskBox.propTypes = {
  isSender: PropTypes.bool,
  children: PropTypes.func.isRequired,
};

export default TaskBox;
