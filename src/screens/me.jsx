import React, { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PARTICIPANT_INFO from '../graphql/participant_info.graphql';
import SafeArea from '../components/safearea';
import ScrollViewRefresh from '../components/scrollview_refresh';
import Button from '../components/button';
import { Row, Cell } from '../components/flexbox';
import { Mail, Settings } from '../components/icons';
import Typography from '../components/typography';
import Borderline from '../components/borderline';
import ArrowSE from '../components/arrow_se';
import DisciplineImage from '../components/discipline_image';
import PressView from '../components/pressview';

import { Screen } from './index';

function Me() {
  const {
    data: {
      participantGetAsParticipant: {
        trainer: { user: { name: trainerName = '' } = {} } = {},
        statusQuos = [],
        vision: visions = [],
        // possibilities = '',
        traitName = null,
      } = {},
    } = {},
    loading,
    refetch,
  } = useQuery(PARTICIPANT_INFO);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onPressDiscipline = () => {
    if (traitName) {
      navigate('Discipline', { discipline: traitName, userDiscipline: traitName });
    } else {
      navigate('Disciplines');
    }
  };

  const onPressDisciplines = () => {
    navigate('Disciplines');
  };

  return (
    <View style={{ paddingTop: 20, flex: 1, backgroundColor: 'white' }}>
      <ScrollViewRefresh loading={loading} refetch={refetch}>
        <SafeArea vSize="none" style={{ marginTop: 70 }}>
          <Row>
            <Cell grow={1} style={{ paddingRight: 10 }}>
              <Button goto="Messages" icon={Mail}>
                Messages
              </Button>
            </Cell>
            <Cell grow={1} style={{ paddingLeft: 10 }}>
              <Button goto="Settings" icon={Settings}>
                Settings
              </Button>
            </Cell>
          </Row>
        </SafeArea>
        <SafeArea vSize="xl">
          <Typography variant="title" style={{ marginBottom: 10 }} centered>
            Your Coach
          </Typography>
          <ArrowSE goto="OnboardTrainer1" variant="display1">
            {trainerName}
          </ArrowSE>
        </SafeArea>
        <Borderline />
        <SafeArea vSize="xl">
          <PressView goto={Screen.StatusQuos}>
            <Typography variant="display4" centered linefit>
              Status Quo
            </Typography>
            {statusQuos.length ? (
              <ArrowSE
                goto="EditSQ"
                navprops={{ statusQuo: statusQuos[0].statusQuo, nodeId: statusQuos[0].nodeId, editable: true }}
                right={false}
              >
                <Typography centered>{statusQuos[0].statusQuo}</Typography>
              </ArrowSE>
            ) : (
              <ArrowSE goto="EditSQ">You coach will guide you to identify this</ArrowSE>
            )}
          </PressView>
        </SafeArea>
        <Borderline />
        <SafeArea vSize="xl">
          <PressView goto="EditVision">
            <Typography variant="display4" centered linefit>
              Vision
            </Typography>
          </PressView>
          {visions.length !== 0 && (
            <ArrowSE goto="EditVision" right={false}>
              <Typography>{visions.join('\n')}</Typography>
            </ArrowSE>
          )}
          {visions.length === 0 && <ArrowSE goto="EditVision">You coach will guide you to identify this</ArrowSE>}
        </SafeArea>
        {/* <Borderline />
        <SafeArea vSize="xl">
          <PressView goto="EditPossibilities">
            <Typography variant="display4" centered linefit>Possibilities</Typography>
          </PressView>
          {possibilities !== '' && (
            <ArrowSE goto="EditPossibilities" right={false}>
              <Typography centered>
                {possibilities}
              </Typography>
            </ArrowSE>
          )}
          {possibilities === '' && (
            <ArrowSE goto="EditPossibilities">
              You coach will guide you to identify this
            </ArrowSE>
          )}
        </SafeArea> */}
        <Borderline />
        <View>
          <SafeArea vSize="xl">
            <PressView goto="Disciplines">
              <Typography variant="display4" style={{ marginBottom: 30 }} centered>
                Discipline
              </Typography>
            </PressView>
            <TouchableOpacity onPress={onPressDiscipline}>
              <DisciplineImage discipline={traitName} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDisciplines}>
              <ArrowSE goto="Disciplines" variant="display1" style={{ marginTop: 40 }}>
                {traitName ? 'See Disciplines' : 'Select Discipline'}
              </ArrowSE>
            </TouchableOpacity>
          </SafeArea>
        </View>
      </ScrollViewRefresh>
    </View>
  );
}

export default Me;
