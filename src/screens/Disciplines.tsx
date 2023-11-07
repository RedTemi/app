import ColorPalette, { Color } from '@Constants/colors';
import disciplines from '@Constants/disciplines';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

import Typography, { TypographyVariant } from '@Components/Typography';
import { Screen } from '../screens/index';

interface DisciplineEntry {
  backgroundColor: Color;
  color: Color;
  purpose: string;
}

const disciplineEntries: [string, DisciplineEntry][] = Object.entries(disciplines);

const renderDiscipline = (
  onPress: (discipline: string) => void,
  [discipline, { backgroundColor, color, purpose }]: [string, DisciplineEntry],
) => {
  return (
    <TouchableOpacity key={discipline} onPress={() => onPress(discipline)} style={{ flex: 1 }}>
      <View
        key={discipline}
        style={{
          flex: 1,
          backgroundColor,
          padding: 10,
          justifyContent: 'center',
        }}
      >
        <Typography
          variant={TypographyVariant.display36}
          centered
          linefit
          color={color}
          style={{ marginBottom: 5, textTransform: 'uppercase' }}
        >
          {discipline}
        </Typography>
        <Typography variant={TypographyVariant.title} centered color={color} style={{ marginBottom: 0 }}>
          {purpose}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const Disciplines = () => {
  const { navigate } = useNavigation();

  const onPress = (discipline: string) => {
    navigate(Screen.Discipline, { discipline });
  };

  return (
    <View style={{ flex: 1, backgroundColor: ColorPalette.white }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'column', marginTop: 50 }}>
          {disciplineEntries.map(discipline => renderDiscipline(onPress, discipline))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Disciplines;
