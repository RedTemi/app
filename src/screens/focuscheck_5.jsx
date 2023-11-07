import React from 'react';
import PropTypes from 'prop-types';
import FCQ from '../components/focuscheck_q';
import { Screen } from '../screens/index';

function FocuscheckScreen5({
  route: {
    params: {
      nodeId = null,
    } = {},
  } = {},
}) {
  return (
    <FCQ
      nodeId={nodeId}
      name="successCriteria"
      goto={Screen.Tools}
      title1="Define measurables"
      title2="Define three success criteria that represent the realisation of all intentions"
      desc=""
      placeholder=""
      btnTxt="Save"
    />
  );
}

FocuscheckScreen5.defaultProps = {
  route: {
    params: {
      nodeId: null,
    },
  },
};

FocuscheckScreen5.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nodeId: PropTypes.string,
    }),
  }),
};

export default FocuscheckScreen5;
