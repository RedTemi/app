import React from 'react';
import PropTypes from 'prop-types';
import FCQ from '../components/focuscheck_q';

function FocuscheckScreen2({
  route: {
    params: {
      nodeId = null,
    } = {},
  } = {},
}) {
  return (
    <FCQ
      nodeId={nodeId}
      name="intentionForMe"
      goto="Focuscheck3"
      title1="Intention for me"
      title2="What should this project fulfill for me?"
      desc="Answer in single words or very short sentences."
      placeholder="Collaboration, acknowledgement"
    />
  );
}

FocuscheckScreen2.defaultProps = {
  route: {
    params: {
      nodeId: null,
    },
  },
};

FocuscheckScreen2.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nodeId: PropTypes.string,
    }),
  }),
};

export default FocuscheckScreen2;
