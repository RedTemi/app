import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView, TouchableOpacity, View,
} from 'react-native';
import Typography from '../components/typography';
import disciplines from '../constants/disciplines.json';
import colors from '../constants/colors';

const disciplineEntries = Object.entries(disciplines);

function renderDiscipline(onPress, [discipline, { backgroundColor, color, purpose }]) {
  function pressHandler() {
    onPress(discipline);
  }
  return (
    <TouchableOpacity key={discipline} onPress={pressHandler} style={{ flex: 1 }}>
      <View
        key={discipline}
        style={{
          flex: 1,
          backgroundColor: colors[backgroundColor],
          padding: 10,
          justifyContent: 'center',
        }}
      >
        <Typography variant="display2" centered linefit color={color} style={{ marginBottom: 5, textTransform: 'uppercase' }}>
          {discipline}
        </Typography>
        <Typography centered color={color} style={{ marginBottom: 0 }}>
          {purpose}
        </Typography>
      </View>
    </TouchableOpacity>
  );
}

function Disciplines() {
  const { navigate } = useNavigation();
  function onPress(discipline) {
    navigate('Discipline', { discipline });
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'column', marginTop: 50 }}>
          {disciplineEntries.map(renderDiscipline.bind(null, onPress))}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Disciplines;
