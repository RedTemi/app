import { useMutation } from '@apollo/client';
import ColorPalette, { Color } from '@Constants/colors';
import disciplines from '@Constants/disciplines';
import { ParticipantUpdateAsParticipantDocument } from '../graphql/types.generated';
import { captureException } from '../lib/sentry';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Button from '@Components/Button';
import Cell from '@Components/Cell';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import { DisciplineScreenProp } from '@Navigation/NavMain';
import { Screen } from '../screens/index';

export type DisciplineScreenParams = {
  discipline: keyof typeof disciplines;
  userDiscipline?: string;
};

const styling = {
  title: {
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 15,
  },
  line: {
    width: 40,
    height: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  lineSmall: {
    width: 30,
    height: 2,
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    marginBottom: 10,
  },
} as const;

const getStringWithHyphens = (text: string, color: Color) => {
  return text.split(' - ').map((line, index) => (
    <Text key={index}>
      {' '}
      <View style={{ paddingHorizontal: 6, paddingBottom: 4 }}>
        <View
          style={{
            flex: 0,
            width: 30,
            height: 1,
            backgroundColor: color,
          }}
        />
      </View>
      {line}
    </Text>
  ));
};

const Discipline = () => {
  const { navigate, setOptions } = useNavigation();
  const [contentEdit] = useMutation(ParticipantUpdateAsParticipantDocument, {
    onError: captureException,
  });

  const route = useRoute<DisciplineScreenProp>();

  const { discipline, userDiscipline } = route.params;

  const onPress = async () => {
    await contentEdit({
      variables: {
        participant: {
          traitName: discipline,
        },
      },
    });
    navigate(Screen.Me);
  };

  const { backgroundColor, color, purpose, strategies, statement } = useMemo(
    () => disciplines[discipline],
    [discipline],
  );

  useLayoutEffect(() => {
    if (backgroundColor === ColorPalette.black) {
      setOptions({
        headerTintColor: ColorPalette.white,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discipline]);

  const style = {
    ...styling,
    line: {
      ...styling.line,
      backgroundColor: color,
    },
    lineSmall: {
      ...styling.lineSmall,
      backgroundColor: color,
    },
  };

  const onChooseDisciplinePress = () => {
    if (userDiscipline === discipline) {
      navigate(Screen.Disciplines);
    } else {
      onPress();
    }
  };

  const onBackPress = () => {
    if (userDiscipline) {
      navigate(Screen.Me);
    }
    if (userDiscipline !== discipline) {
      navigate(Screen.Disciplines);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 80,
        backgroundColor,
      }}
    >
      <SafeArea size={SafeAreaSize.lg}>
        <Row flexDirection="column" style={{ flex: 1, flexDirection: 'column' }}>
          <View>
            <Typography variant={TypographyVariant.display50} centered color={color} linefit style={style.heading}>
              {discipline.toUpperCase()}
            </Typography>
            <View style={style.line} />
          </View>
          <Cell>
            <View style={style.section}>
              <Typography variant={TypographyVariant.title} centered color={color} style={style.title}>
                Purpose
              </Typography>
              <Typography centered color={color}>
                {purpose}
              </Typography>
            </View>
            <View style={style.section}>
              <Typography variant={TypographyVariant.title} centered color={color} style={style.title}>
                Coping strategy
              </Typography>
              <View style={{ marginHorizontal: 'auto' }}>
                <Typography centered color={color}>
                  {getStringWithHyphens(strategies, color)}
                </Typography>
              </View>
            </View>
            <View style={style.section}>
              <Typography variant={TypographyVariant.title} centered color={color} style={style.title}>
                Statement
              </Typography>
              <Typography centered color={color}>
                &ldquo;
                {statement}
                &rdquo;
              </Typography>
            </View>
          </Cell>
          <Cell style={{ width: '100%' }}>
            <Button
              color={backgroundColor === ColorPalette.black ? ColorPalette.secondary : ColorPalette.default}
              onPress={onChooseDisciplinePress}
              wide
              style={{ marginBottom: 30 }}
            >
              {discipline === userDiscipline ? 'Change discipline' : 'Choose this discipline'}
            </Button>
            <TouchableOpacity onPress={onBackPress}>
              <Typography variant={TypographyVariant.title} centered color={color}>
                GO BACK
              </Typography>
            </TouchableOpacity>
          </Cell>
        </Row>
      </SafeArea>
    </View>
  );
};

export default Discipline;
