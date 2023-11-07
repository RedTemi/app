import React from 'react';
import PropTypes from 'prop-types';
import FCQ from '../components/focuscheck_q';

function FocuscheckScreen4({
  route: {
    params: {
      nodeId = null,
    } = {},
  } = {},
}) {
  return (
    <FCQ
      nodeId={nodeId}
      name="investigation"
      goto="Focuscheck5"
      title1="Prioritize the questions"
      title2="Which three questions need to be answered to realize all the intentions?"
      desc=""
      placeholder=""
    />
  );
}

FocuscheckScreen4.defaultProps = {
  route: {
    params: {
      nodeId: null,
    },
  },
};

FocuscheckScreen4.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nodeId: PropTypes.string,
    }),
  }),
};

export default FocuscheckScreen4;
