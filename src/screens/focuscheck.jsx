import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { ScrollView } from 'react-native';
import QueryFocuscheck from '../graphql/query.focuscheck.graphql';
import useHeaderRight from '../hooks/header_right_focuscheck';
import Typography from '../components/typography';
import style from '../style/focuscheck';
import SafeArea from '../components/safearea';
import Background from '../components/background';

const { container, subtitle } = style;

function Focuscheck({ route: { params: { nodeId } } }) {
  useHeaderRight(nodeId);
  const {
    data: {
      focuscheckGetAsParticipant: {
        title,
        intentionForMe,
        intentionForOthers,
        investigation,
        successCriteria,
      } = {},
    } = {},
    refetch,
  } = useQuery(QueryFocuscheck, { variables: { id: nodeId } });
  useFocusEffect(useCallback(() => {
    refetch();
  }, [refetch]));
  return (
    <Background color="white" style={{ flex: 1 }}>
      <ScrollView>
        <SafeArea style={container}>
          <Typography variant="display2" color="primary">
            {title}
          </Typography>
          <Typography variant="title" color="primary" style={subtitle}>
            Intentions for me
          </Typography>
          <Typography>
            {intentionForMe}
          </Typography>
          <Typography variant="title" color="primary" style={subtitle}>
            Intentions for others
          </Typography>
          <Typography>
            {intentionForOthers}
          </Typography>
          <Typography variant="title" color="primary" style={subtitle}>
            Investigation
          </Typography>
          <Typography>
            {investigation}
          </Typography>
          <Typography variant="title" color="primary" style={subtitle}>
            Success criteria
          </Typography>
          <Typography>
            {successCriteria}
          </Typography>
        </SafeArea>
      </ScrollView>
    </Background>
  );
}

Focuscheck.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nodeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Focuscheck;
