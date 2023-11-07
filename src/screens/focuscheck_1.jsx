import React from 'react';
import PropTypes from 'prop-types';
import FCQ from '../components/focuscheck_q';

function FocuscheckScreen1({
  route: {
    params: {
      nodeId = null,
    } = {},
  } = {},
}) {
  return (
    <FCQ
      nodeId={nodeId}
      name="title"
      goto="Focuscheck2"
      title1=""
      title2="Name the project"
      desc="Name"
      placeholder="E.g. annual report"
    />
  );
}

FocuscheckScreen1.defaultProps = {
  route: {
    params: {
      nodeId: null,
    },
  },
};

FocuscheckScreen1.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nodeId: PropTypes.string,
    }),
  }),
};

export default FocuscheckScreen1;
