import { useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { ParticipantDetailsDocument, ParticipantDetailsQuery } from '@Graphql/types.generated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';

import ArrowSE from '@Components/ArrowSecondary';
import Button from '@Components/Button';
import Cell from '@Components/Cell';
import Mail from '@Components/IconComponents/Mail';
import Settings from '@Components/IconComponents/Settings';
import DisciplineImage from '@Components/ImageComponents/DisciplineImage';
import PressView from '@Components/PressView';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import ScrollViewRefresh from '@Components/ScrollViewRefresh';
import Typography, { TypographyVariant } from '@Components/Typography';
import { Screen } from '@Screens/index';

const Me = () => {
  const {
    data: {
      participantGetAsParticipant: {
        trainer: { user: { name: trainerName = '' } = {} } = {},
        statusQuos = [],
        vision: visions = [],
        traitName = undefined,
      } = {},
    } = {},
    loading,
    refetch,
  } = useQuery<ParticipantDetailsQuery>(ParticipantDetailsDocument);

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onPressDiscipline = () => {
    if (traitName) {
      return navigate(Screen.Discipline, { discipline: traitName, userDiscipline: traitName });
    }

    return navigate(Screen.Disciplines);
  };

  return (
    <View style={{ paddingTop: 20, flex: 1, backgroundColor: ColorPalette.white }}>
      <ScrollViewRefresh loading={loading} refetch={refetch}>
        <SafeArea size={SafeAreaSize.md} vSize={SafeAreaSize.none} style={{ marginTop: 70 }}>
          <Row justifyContent="space-between" alignItems="center">
            <Cell grow={2} style={{ paddingRight: 10 }}>
              <Button goto={Screen.Messages} icon={Mail} wide>
                Messages
              </Button>
            </Cell>

            <Cell grow={2} style={{ paddingLeft: 10 }}>
              <Button goto={Screen.Settings} icon={Settings} wide>
                Settings
              </Button>
            </Cell>
          </Row>
        </SafeArea>

        <SafeArea vSize={SafeAreaSize.xl}>
          <Typography variant={TypographyVariant.title} style={{ marginBottom: 10 }} centered>
            Your Coach
          </Typography>
          <ArrowSE
            onPress={() => navigate(Screen.OnboardTrainerStep1)}
            typographyVariant={TypographyVariant.display22}
            right
          >
            {trainerName}
          </ArrowSE>
        </SafeArea>

        <View style={{ borderTopColor: ColorPalette.black, borderTopWidth: 1 }} />

        <SafeArea vSize={SafeAreaSize.xl}>
          <PressView navigateTo={Screen.StatusQuos}>
            <Typography variant={TypographyVariant.display58} centered linefit>
              Status Quo
            </Typography>
            {statusQuos.length ? (
              <ArrowSE
                onPress={() =>
                  navigate(Screen.EditStatusQuo, {
                    statusQuo: statusQuos[0].statusQuo,
                    nodeId: statusQuos[0].nodeId,
                    editable: true,
                  })
                }
                right={false}
              >
                <Typography variant={TypographyVariant.title} centered>
                  {statusQuos[0].statusQuo}
                </Typography>
              </ArrowSE>
            ) : (
              <ArrowSE onPress={() => navigate(Screen.EditStatusQuo)}>
                You coach will guide you to identify this
              </ArrowSE>
            )}
          </PressView>
        </SafeArea>

        <View style={{ borderTopColor: ColorPalette.black, borderTopWidth: 1 }} />

        <SafeArea vSize={SafeAreaSize.xl}>
          <PressView navigateTo={Screen.EditVision}>
            <Typography variant={TypographyVariant.display58} centered linefit>
              Vision
            </Typography>
          </PressView>
          {Boolean(visions.length) && (
            <ArrowSE onPress={() => navigate(Screen.EditVision)}>
              <Typography variant={TypographyVariant.title}>{visions.join('\n')}</Typography>
            </ArrowSE>
          )}
          {Boolean(!visions.length) && (
            <ArrowSE onPress={() => navigate(Screen.EditVision)}>You coach will guide you to identify this</ArrowSE>
          )}
        </SafeArea>

        <View style={{ borderTopColor: ColorPalette.black, borderTopWidth: 1 }} />

        <View>
          <SafeArea vSize={SafeAreaSize.xl}>
            <PressView navigateTo={Screen.Disciplines}>
              <Typography variant={TypographyVariant.display58} style={{ marginBottom: 30 }} centered>
                Discipline
              </Typography>
            </PressView>

            <TouchableOpacity onPress={onPressDiscipline}>
              <DisciplineImage discipline={traitName} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate(Screen.Disciplines)}>
              <ArrowSE
                onPress={() => navigate(Screen.Disciplines)}
                right
                typographyVariant={TypographyVariant.display22}
                style={{ marginTop: 40 }}
              >
                {traitName ? 'See Disciplines' : 'Select Discipline'}
              </ArrowSE>
            </TouchableOpacity>
          </SafeArea>
        </View>
      </ScrollViewRefresh>
    </View>
  );
};

export default Me;
