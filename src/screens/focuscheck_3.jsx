import React from 'react';
import PropTypes from 'prop-types';
import FCQ from '../components/focuscheck_q';

function FocuscheckScreen3({
  route: {
    params: {
      nodeId = null,
    } = {},
  } = {},
}) {
  return (
    <FCQ
      nodeId={nodeId}
      name="intentionForOthers"
      goto="Focuscheck4"
      title1="Intention for others"
      title2="What should this project fulfill for others?"
      desc="Answer in single words or very short sentences."
      placeholder="Collaboration, acknowledgement"
    />
  );
}

FocuscheckScreen3.defaultProps = {
  route: {
    params: {
      nodeId: null,
    },
  },
};

FocuscheckScreen3.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nodeId: PropTypes.string,
    }),
  }),
};

export default FocuscheckScreen3;
