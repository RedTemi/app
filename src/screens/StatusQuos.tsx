import { useQuery } from '@apollo/client';
import { ParticipantDetailsDocument, ParticipantDetailsQuery } from '@Graphql/types.generated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import Button from '@Components/Button';
import Cell from '@Components/Cell';
import SafeArea from '@Components/SafeArea';
import ScrollViewRefresh from '@Components/ScrollViewRefresh';
import StatusQuoListItem from '@Components/StatusQuoListItem';
import Typography, { TypographyVariant } from '@Components/Typography';
import { Screen } from '@Screens/index';

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
    navigate(Screen.EditStatusQuo, { editable: true });
  };

  return (
    <SafeArea>
      <ScrollViewRefresh loading={loading} refetch={refetch}>
        <View style={{ margin: 15, marginTop: 70 }}>
          <Typography variant={TypographyVariant.display36} centered linefit>
            Status Quo
          </Typography>

          <Typography variant={TypographyVariant.header} style={{ paddingHorizontal: 24 }} centered>
            These are areas where results aren’t currently showing up in my work life.
          </Typography>

          <Cell grow={1} style={{ marginTop: 40, paddingHorizontal: 34 }}>
            <Button onPress={onMakeButtonPress}>Make</Button>
          </Cell>
        </View>

        {Boolean(statusQuos.length) && (
          <View style={{ marginTop: 100 }}>
            <Typography variant={TypographyVariant.display22} centered linefit>
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
