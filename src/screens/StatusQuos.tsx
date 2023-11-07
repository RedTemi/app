import { useQuery } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import Button from '../components/button';
import Cell from '../components/cell';
import SafeArea from '../components/safearea';
import ScrollViewRefresh from '../components/scrollview_refresh';
import StatusQuoListItem from '../components/StatusQuoListItem';
import Typography from '../components/typography';
import { ParticipantDetailsDocument, ParticipantDetailsQuery } from '../../types.generated';

const StatusQuos = () => {
  const {
    data: { participantGetAsParticipant: { statusQuos = [] } = {} } = {},
    loading,
    refetch,
  } = useQuery<ParticipantDetailsQuery>(ParticipantDetailsDocument);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onMakeButtonPress = () => {
    navigate('EditSQ', { editable: true });
  };

  return (
    <SafeArea size="none">
      <ScrollViewRefresh loading={loading} refetch={refetch}>
        <View style={{ margin: 15, marginTop: 70 }}>
          <Typography variant="display4" centered linefit>
            Status Quo
          </Typography>

          <Typography variant="heading" style={{ paddingHorizontal: 24 }} centered>
            These are areas where results aren’t currently showing up in my work life.
          </Typography>

          <Cell grow={1} style={{ marginTop: 40, paddingHorizontal: 34 }}>
            <Button onPress={onMakeButtonPress}>Make</Button>
          </Cell>
        </View>

        {Boolean(statusQuos.length) && (
          <View style={{ marginTop: 100 }}>
            <Typography variant="display2" centered linefit>
              Latest
            </Typography>

            {statusQuos.map((statusQuo, index) => (
              <StatusQuoListItem item={statusQuo} key={statusQuo.nodeId} isCurrentStatusQuo={index === 0} />
            ))}
          </View>
        )}
      </ScrollViewRefresh>
    </SafeArea>
  );
};

export default StatusQuos;
