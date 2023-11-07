import ColorPalette from '@Constants/colors';
import { Session } from '../graphql/types.generated';
import { formatDayMonth, formatHoursMinutes } from '../lib/date';
import { useNavigation } from '@react-navigation/native';
import { addMinutes } from 'date-fns';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Row from '@Components/Row';
import Typography, { TypographyVariant } from '@Components/Typography';
import ArrowRight from '@Icons/arrow-right.svg';
import { Screen } from '../screens/index';
import { isDefined } from '@Utils/types';

export enum SessionBoxVariant {
  prevSession = 'prevSession',
  nextSession = 'nextSession',
  upcomingSession = 'upcomingSession',
}

interface SessionBoxProps {
  session: Session;
  sessionNo: number;
  variant: SessionBoxVariant;
  hasVerticalLine: boolean;
}

const getSessionBoxColor = (variant: SessionBoxVariant) => {
  if (variant === SessionBoxVariant.prevSession) {
    return ColorPalette.blue;
  }
  if (variant === SessionBoxVariant.nextSession) {
    return ColorPalette.white;
  }
  return ColorPalette.gray300;
};

const SessionBox = ({ session, sessionNo, variant, hasVerticalLine }: SessionBoxProps) => {
  const { start, duration } = session;

  const { navigate } = useNavigation();

  const onPress = () => {
    navigate(Screen.Session, {
      sessionId: session.nodeId,
    });
  };

  const sessionStartDate = new Date(start);
  const dayMonth = formatDayMonth(sessionStartDate);
  const hoursMinutesStart = formatHoursMinutes(sessionStartDate);
  const hoursMinutesEnd = formatHoursMinutes(addMinutes(sessionStartDate, duration));

  const tagsList = [
    session.focusChecks.length ? '*Focus Check' : undefined,
    session.tasks.length ? '*Task' : undefined,
    session.tasks.length ? '*Task' : undefined,
    session.notes.length ? '*Note' : undefined,
    session.markedRecognitionAt ? 'Rec. session' : undefined,
    session.markedStatusQuoAt ? 'Status Quo' : undefined,
  ].filter(isDefined);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: variant === SessionBoxVariant.nextSession ? ColorPalette.blue : ColorPalette.white,
            borderColor: variant === SessionBoxVariant.upcomingSession ? ColorPalette.gray300 : ColorPalette.blue,
          },
        ]}
        onPress={onPress}
      >
        <Row style={styles.boxContent}>
          <View style={styles.sessionNumberContainer}>
            <Typography style={styles.sessionNumber} color={getSessionBoxColor(variant)} centered>
              {sessionNo}
            </Typography>
            <View style={styles.dateContainer}>
              <Typography color={getSessionBoxColor(variant)} variant={TypographyVariant.title}>
                {`${dayMonth}, ${hoursMinutesStart} - ${hoursMinutesEnd}`}
              </Typography>
              {variant === SessionBoxVariant.nextSession && (
                <Typography variant={TypographyVariant.title} color={ColorPalette.white}>
                  Next session
                </Typography>
              )}
            </View>
          </View>
          <View style={styles.tagsContainer}>
            {tagsList.map((tag, index) => {
              return (
                <Typography
                  key={index}
                  color={variant === SessionBoxVariant.nextSession ? ColorPalette.white : ColorPalette.gray300}
                  style={[
                    styles.tag,
                    variant === SessionBoxVariant.nextSession ? { borderColor: ColorPalette.white } : undefined,
                  ]}
                >
                  {tag}
                </Typography>
              );
            })}
          </View>
          <View style={styles.arrowContainer}>
            <ArrowRight fill={getSessionBoxColor(variant)} />
          </View>
        </Row>
      </TouchableOpacity>
      {hasVerticalLine && <View style={styles.line} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderColor: ColorPalette.blue,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  line: {
    backgroundColor: ColorPalette.blue,
    width: 2,
    height: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  boxContent: {
    minHeight: 115,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  sessionNumberContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sessionNumber: {
    fontSize: 100,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginRight: 40,
  },
  tag: {
    borderColor: ColorPalette.gray300,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 5,
    marginBottom: 15,
    marginRight: 10,
  },
  dateContainer: {
    alignItems: 'flex-end',
    flex: 1,
    marginTop: 20,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
  },
});

export default SessionBox;
