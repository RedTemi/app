import { useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { FocuscheckGetAsParticipantDocument, FocuscheckGetAsParticipantQuery } from '../graphql/types.generated';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';

import Background from '@Components/Background';
import SafeArea from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import useHeaderRight from '../hooks/header_right_focuscheck';
import { FocusCheckScreenProp } from '@Navigation/NavMain';
import style from '../style/FocusCheck';

export type FocusCheckScreenParams = { nodeId: string };

const { container, subtitle } = style;

const Focuscheck = () => {
  const route = useRoute<FocusCheckScreenProp>();

  useHeaderRight(route.params.nodeId);

  const {
    data: {
      focuscheckGetAsParticipant: {
        title = '',
        intentionForMe = '',
        intentionForOthers = '',
        investigation = '',
        successCriteria = '',
      } = {},
    } = {},
    refetch,
  } = useQuery<FocuscheckGetAsParticipantQuery>(FocuscheckGetAsParticipantDocument, {
    variables: { id: route.params.nodeId },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const renderTitle = (text: string, isSubtitle?: boolean) => {
    return (
      <Typography
        variant={TypographyVariant.title}
        color={ColorPalette.primary}
        style={isSubtitle ? subtitle : undefined}
      >
        {text}
      </Typography>
    );
  };

  return (
    <Background color={ColorPalette.white} style={{ flex: 1 }}>
      <ScrollView>
        <SafeArea style={container}>
          <Typography variant={TypographyVariant.display36} color={ColorPalette.primary}>
            {title}
          </Typography>
          {renderTitle('Intentions for me', true)}
          <Typography variant={TypographyVariant.title}>{intentionForMe}</Typography>
          {renderTitle('Intentions for others', true)}
          <Typography variant={TypographyVariant.title}>{intentionForOthers}</Typography>
          {renderTitle('Investigation', true)}
          <Typography variant={TypographyVariant.title}>{investigation}</Typography>
          {(renderTitle('Success criteria'), true)}
          <Typography variant={TypographyVariant.title}>{successCriteria}</Typography>
        </SafeArea>
      </ScrollView>
    </Background>
  );
};

export default Focuscheck;
