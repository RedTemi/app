import React, { useMemo, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import participantUpdateAsParticipant from '../graphql/mutation.participantUpdateAsParticipant.graphql';
import disciplines from '../constants/disciplines.json';
import colors from '../constants/colors';
import Typography from '../components/typography';
import Button from '../components/button';
import SafeArea from '../components/safearea';
import { Row, Cell } from '../components/flexbox';
import { captureException } from '../lib/sentry';

const onError = captureException;

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
    textTransform: 'uppercase',
    marginBottom: 10,
  },
};

function getStringWithHyphens(text, color) {
  return text.split(' - ').map((line, index) => (
    <Text key={String(index)}>
      {' '}
      <View style={{ paddingHorizontal: 6, paddingBottom: 4 }}>
        <View
          style={{
            flex: 0,
            width: 30,
            height: 1,
            backgroundColor: colors[color],
          }}
        />
      </View>
      {line}
    </Text>
  ));
}

const Discipline = ({
  route: {
    params: { discipline, userDiscipline },
  },
}) => {
  const { navigate, setOptions } = useNavigation();
  const [contentEdit] = useMutation(participantUpdateAsParticipant, {
    onError,
  });
  async function onPress() {
    await contentEdit({
      variables: {
        participant: {
          traitName: discipline,
        },
      },
    });
    navigate('Me');
  }

  const {
    backgroundColor, color, purpose, strategies, statement,
  } = useMemo(
    () => disciplines[discipline],
    [discipline],
  );

  useLayoutEffect(() => {
    if (backgroundColor === 'black') {
      setOptions({
        headerTintColor: colors.white,
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
      navigate('Disciplines');
    } else {
      onPress();
    }
  };

  const onBackPress = () => {
    if (userDiscipline) {
      navigate('Me');
    }
    if (userDiscipline !== discipline) {
      navigate('Disciplines');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 80,
        backgroundColor: colors[backgroundColor],
      }}
    >
      <SafeArea size="lg">
        <Row column style={{ flex: 1, flexDirection: 'column' }}>
          <View>
            <Typography
              variant="display3"
              centered
              color={color}
              linefit
              style={style.heading}
            >
              {discipline}
            </Typography>
            <View style={style.line} />
          </View>
          <Cell>
            <View style={style.section}>
              <Typography
                variant="title"
                centered
                color={color}
                style={style.title}
              >
                Purpose
              </Typography>
              <Typography centered color={color}>
                {purpose}
              </Typography>
            </View>
            <View style={style.section}>
              <Typography
                variant="title"
                centered
                color={color}
                style={style.title}
              >
                Coping strategy
              </Typography>
              <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <Typography centered color={color}>
                  {getStringWithHyphens(strategies, color)}
                </Typography>
              </View>
            </View>
            <View style={style.section}>
              <Typography
                variant="title"
                centered
                color={color}
                style={style.title}
              >
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
              color={backgroundColor === 'black' ? 'secondary' : 'default'}
              onPress={onChooseDisciplinePress}
              style={{ marginBottom: 30 }}
            >
              {discipline === userDiscipline
                ? 'Change discipline'
                : 'Choose this discipline'}
            </Button>
            <TouchableOpacity onPress={onBackPress}>
              <Typography variant="title" centered color={color}>
                GO BACK
              </Typography>
            </TouchableOpacity>
          </Cell>
        </Row>
      </SafeArea>
    </View>
  );
};

Discipline.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      discipline: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Discipline;
