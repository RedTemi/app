import { RouteProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';

import useSentryUser from '../hooks/sentryuser';
import Camera, { CameraScreenParams } from '../screens/Camera';
import CancelSubscription from '../screens/cancel_subscription';
import Discipline from '../screens/discipline';
import DisciplineTest from '../screens/discipline_test';
import Disciplines from '../screens/disciplines';
import EditPossibilities from '../screens/edit_possibilities';
import EditSettings from '../screens/edit_settings';
import EditSQ from '../screens/EditStatusQuo';
import EditVision from '../screens/edit_vision';
import Focuscheck from '../screens/focuscheck';
import Focuscheck0 from '../screens/focuscheck_0';
import Focuscheck1 from '../screens/focuscheck_1';
import Focuscheck2 from '../screens/focuscheck_2';
import Focuscheck3 from '../screens/focuscheck_3';
import Focuscheck4 from '../screens/focuscheck_4';
import Focuscheck5 from '../screens/focuscheck_5';
import { Screen } from '../screens/index';
import Messages from '../screens/messages';
import Note from '../screens/note';
import NoteAdd, { NoteAddScreenParams } from '../screens/note_add';
import OnboardPhoto from '../screens/onboard_photo';
import OnboardTerms from '../screens/onboard_terms';
import OnboardTrainer1 from '../screens/onboard_trainer1';
import OnboardTrainer2 from '../screens/onboard_trainer2';
import OnboardFinish from '../screens/OnboardFinish';
import Privacy from '../screens/privacy';
import Session, { SessionScreenNavParams } from '../screens/session';
import SessionBook, { SessionBookScreenParams } from '../screens/session_book';
import Settings from '../screens/settings';
import SignOut from '../screens/signout';
import Support from '../screens/support';
import Task from '../screens/task';
import Terms from '../screens/terms';
import Trainer from '../screens/trainer';
import navStyleOptions from '../style/nav-main';
import { useSessionBookTime } from '../context/SessionBookTimeContext';

import NavTabs from './tab';
import StatusQuos from '../screens/StatusQuos';

const screenOptions = {
  headerShown: false,
};

const optionsWithHeader = (title?: string, style?: string) => {
  const styleOptions = navStyleOptions(style);
  return {
    ...styleOptions,
    title,
  };
};

type RootStackParamList = {
  [Screen.Session]: SessionScreenNavParams;
  [Screen.NoteAdd]?: NoteAddScreenParams;
  [Screen.SessionBook]?: undefined;
  [Screen.OnboardFinish]?: Record<string, never>;
  [Screen.camera]: CameraScreenParams;
};

export type SessionScreenNavProp = RouteProp<RootStackParamList, Screen.Session>;
export type NoteAddScreenProp = RouteProp<RootStackParamList, Screen.NoteAdd>;
export type SessionBookScreenProp = RouteProp<RootStackParamList, Screen.SessionBook>;
export type CameraScreenProp = RouteProp<RootStackParamList, Screen.camera>;

const Stack = createStackNavigator<RootStackParamList>();

function NavMain() {
  const { isOnboarding } = useSessionBookTime();
  const { navigate } = useNavigation();

  useSentryUser();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="NavTabs" component={NavTabs} />
      <Stack.Screen
        name={Screen.Session}
        component={Session}
        options={{
          ...optionsWithHeader(''),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigate('NavTabs', { screen: 'Sessions' });
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={Screen.SessionBook}
        component={SessionBook}
        options={optionsWithHeader('Book multiple sessions')}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          ...optionsWithHeader('Messages'),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigate('NavTabs', { screen: 'Me' });
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="Settings" component={Settings} options={optionsWithHeader('Settings', 'settings')} />
      <Stack.Screen
        name={Screen.editSettings}
        component={EditSettings}
        options={optionsWithHeader('Settings', 'settings')}
      />
      <Stack.Screen name="SignOut" component={SignOut} />
      <Stack.Screen name={Screen.NoteAdd} component={NoteAdd} options={optionsWithHeader('Add note')} />
      <Stack.Screen name="Focuscheck" component={Focuscheck} options={optionsWithHeader('Focus check', 'focus')} />
      <Stack.Screen
        name="Focuscheck0"
        component={Focuscheck0}
        options={optionsWithHeader('Focus check', 'focus_start')}
      />
      <Stack.Screen name="Focuscheck1" component={Focuscheck1} options={optionsWithHeader('Focus check', 'focus')} />
      <Stack.Screen name="Focuscheck2" component={Focuscheck2} options={optionsWithHeader('Focus check', 'focus')} />
      <Stack.Screen name="Focuscheck3" component={Focuscheck3} options={optionsWithHeader('Focus check', 'focus')} />
      <Stack.Screen name="Focuscheck4" component={Focuscheck4} options={optionsWithHeader('Focus check', 'focus')} />
      <Stack.Screen name="Focuscheck5" component={Focuscheck5} options={optionsWithHeader('Focus check', 'focus')} />
      <Stack.Screen
        name="Note"
        component={Note}
        options={{
          ...optionsWithHeader('Note'),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigate('NavTabs', { screen: 'Tools' });
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="Task" component={Task} />
      <Stack.Screen name="Trainer" component={Trainer} options={optionsWithHeader()} />
      <Stack.Screen name="EditSQ" component={EditSQ} options={optionsWithHeader()} />
      <Stack.Screen name="EditVision" component={EditVision} options={optionsWithHeader()} />
      <Stack.Screen name="EditPossibilities" component={EditPossibilities} options={optionsWithHeader()} />
      <Stack.Screen name="Disciplines" component={Disciplines} options={optionsWithHeader('Select Discipline')} />
      <Stack.Screen name="Discipline" component={Discipline} options={optionsWithHeader('Discipline')} />
      <Stack.Screen name="DisciplineTest" component={DisciplineTest} options={optionsWithHeader()} />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ ...optionsWithHeader('Terms'), animationEnabled: false }}
      />
      <Stack.Screen name="Privacy" component={Privacy} options={optionsWithHeader('Privacy')} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="CancelSubscription" component={CancelSubscription} options={optionsWithHeader()} />
      <Stack.Screen name="OnboardTerms" component={OnboardTerms} options={{ animationEnabled: false }} />
      <Stack.Screen name={Screen.onboardPhoto} component={OnboardPhoto} options={{ animationEnabled: false }} />
      <Stack.Screen
        name="OnboardTrainer1"
        component={OnboardTrainer1}
        options={{ ...(!isOnboarding && optionsWithHeader('Trainer')), animationEnabled: false }}
      />
      <Stack.Screen name="OnboardTrainer2" component={OnboardTrainer2} options={{ animationEnabled: false }} />
      <Stack.Screen name={Screen.OnboardFinish} component={OnboardFinish} options={{ animationEnabled: false }} />
      <Stack.Screen name={Screen.camera} component={Camera} />
      <Stack.Screen
        name={Screen.StatusQuos}
        component={StatusQuos}
        options={{
          ...optionsWithHeader(''),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigate('Me');
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default NavMain;
