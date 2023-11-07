import { RouteProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';

import { useSessionBookTime } from '../context/SessionBookTimeContext';
import useSentryUser from '../hooks/sentryUser';
import Camera, { CameraScreenParams } from '../screens/Camera';
import CancelSubscription from '../screens/CancelSubscription';
import Discipline, { DisciplineScreenParams } from '../screens/Discipline';
import Disciplines from '../screens/Disciplines';
import DisciplineTest from '../screens/DisciplineTest';
import EditPossibilities from '../screens/EditPossibilities';
import EditSettings from '../screens/EditSettings';
import EditStatusQuo, { EditStatusQuoScreenParams } from '../screens/EditStatusQuo';
import EditVision from '../screens/EditVision';
import Focuscheck, { FocusCheckScreenParams } from '../screens/Focuscheck';
import FocusCheckStart from '../screens/FocusCheckStart';
import FocusCheckStep1, { FocusCheckStep1ScreenParams } from '../screens/FocusCheckStep1';
import FocusCheckStep2, { FocusCheckStep2ScreenParams } from '../screens/FocusCheckStep2';
import FocusCheckStep3, { FocusCheckStep3ScreenParams } from '../screens/FocusCheckStep3';
import FocusCheckStep4, { FocusCheckStep4ScreenParams } from '../screens/FocusCheckStep4';
import FocusCheckStep5, { FocusCheckStep5ScreenParams } from '../screens/FocusCheckStep5';
import { Screen } from '../screens/index';
import Messages from '../screens/Messages';
import Note, { NoteScreenParams } from '../screens/Note';
import NoteAdd, { NoteAddScreenParams } from '../screens/NoteAdd';
import OnboardFinish from '../screens/OnboardFinish';
import OnboardPhoto from '../screens/OnboardPhoto';
import OnboardTerms from '../screens/OnboardTerms';
import OnboardTrainerStep1 from '../screens/OnboardTrainerStep1';
import OnboardTrainerStep2 from '../screens/OnboardTrainerStep2';
import Privacy from '../screens/Privacy';
import SessionBook, { SessionBookScreenParams } from '../screens/SessionBook';
import Settings from '../screens/Settings';
import SignOut from '../screens/SignOut';
import StatusQuos from '../screens/StatusQuos';
import Support from '../screens/Support';
import Task, { TaskScreenParams } from '../screens/Task';
import Terms from '../screens/Terms';
import Trainer from '../screens/Trainer';
import navStyleOptions from '../style/NavMain';

import NavTabs from './Tab';

const screenOptions = {
  headerShown: false,
};

export const optionsWithHeader = (title?: string, style?: 'focus_start' | 'focus' | 'settings') => {
  const styleOptions = navStyleOptions(style);
  return {
    ...styleOptions,
    title,
  };
};

type RootStackParamList = {
  [Screen.Messages]: undefined;
  [Screen.Note]: NoteScreenParams;
  [Screen.NoteAdd]?: NoteAddScreenParams;
  [Screen.SessionBook]?: SessionBookScreenParams;
  [Screen.OnboardTerms]: undefined;
  [Screen.OnboardFinish]?: Record<string, never>;
  [Screen.camera]: CameraScreenParams;
  [Screen.DisciplineTest]: undefined;
  [Screen.Discipline]: DisciplineScreenParams;
  [Screen.Disciplines]: undefined;
  [Screen.EditPossibilities]: undefined;
  [Screen.EditStatusQuo]: EditStatusQuoScreenParams;
  [Screen.Focuscheck]: FocusCheckScreenParams;
  [Screen.FocusCheckStart]: undefined;
  [Screen.FocusCheckStep1]?: FocusCheckStep1ScreenParams;
  [Screen.FocusCheckStep2]: FocusCheckStep2ScreenParams;
  [Screen.FocusCheckStep3]: FocusCheckStep3ScreenParams;
  [Screen.FocusCheckStep4]: FocusCheckStep4ScreenParams;
  [Screen.FocusCheckStep5]: FocusCheckStep5ScreenParams;
  [Screen.Settings]: undefined;
  [Screen.EditSettings]: undefined;
  [Screen.Privacy]: undefined;
  [Screen.NavTabs]: undefined;
  [Screen.Task]: TaskScreenParams;
  [Screen.Terms]: undefined;
  [Screen.OnboardTrainerStep1]: undefined;
  [Screen.OnboardTrainerStep2]: undefined;
  [Screen.EditVision]: undefined;
  [Screen.SignOut]: undefined;
  [Screen.StatusQuos]: undefined;
  [Screen.Trainer]: undefined;
  [Screen.Support]: undefined;
  [Screen.CancelSubscription]: undefined;
  [Screen.OnboardPhoto]: undefined;
};

export type NoteScreenProp = RouteProp<RootStackParamList, Screen.Note>;
export type NoteAddScreenProp = RouteProp<RootStackParamList, Screen.NoteAdd>;
export type SessionBookScreenProp = RouteProp<RootStackParamList, Screen.SessionBook>;
export type CameraScreenProp = RouteProp<RootStackParamList, Screen.camera>;
export type FocusCheckScreenProp = RouteProp<RootStackParamList, Screen.Focuscheck>;
export type FocusCheckStep1ScreenProp = RouteProp<RootStackParamList, Screen.FocusCheckStep1>;
export type FocusCheckStep2ScreenProp = RouteProp<RootStackParamList, Screen.FocusCheckStep2>;
export type FocusCheckStep3ScreenProp = RouteProp<RootStackParamList, Screen.FocusCheckStep3>;
export type FocusCheckStep4ScreenProp = RouteProp<RootStackParamList, Screen.FocusCheckStep4>;
export type FocusCheckStep5ScreenProp = RouteProp<RootStackParamList, Screen.FocusCheckStep5>;

export type DisciplineScreenProp = RouteProp<RootStackParamList, Screen.Discipline>;

export type EditStatusQuoScreenProp = RouteProp<RootStackParamList, Screen.EditStatusQuo>;

export type TaskScreenProp = RouteProp<RootStackParamList, Screen.Task>;

const Stack = createStackNavigator<RootStackParamList>();

const NavMain = () => {
  const { isOnboarding } = useSessionBookTime();
  const { navigate } = useNavigation();

  useSentryUser();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Screen.NavTabs} component={NavTabs} />
      <Stack.Screen name={Screen.SessionBook} component={SessionBook} options={optionsWithHeader('Book sessions')} />
      <Stack.Screen
        name={Screen.Messages}
        component={Messages}
        options={{
          ...optionsWithHeader('Messages'),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigate(Screen.NavTabs, { screen: Screen.Me });
              }}
            />
          ),
        }}
      />
      <Stack.Screen name={Screen.Settings} component={Settings} options={optionsWithHeader('Settings', 'settings')} />
      <Stack.Screen
        name={Screen.EditSettings}
        component={EditSettings}
        options={optionsWithHeader('Settings', 'settings')}
      />
      <Stack.Screen name={Screen.SignOut} component={SignOut} />
      <Stack.Screen name={Screen.NoteAdd} component={NoteAdd} options={optionsWithHeader('Add note')} />
      <Stack.Screen
        name={Screen.Focuscheck}
        component={Focuscheck}
        options={optionsWithHeader('Focus check', 'focus')}
      />
      <Stack.Screen
        name={Screen.FocusCheckStart}
        component={FocusCheckStart}
        options={optionsWithHeader('Focus check', 'focus_start')}
      />
      <Stack.Screen
        name={Screen.FocusCheckStep1}
        component={FocusCheckStep1}
        options={optionsWithHeader('Focus check', 'focus')}
      />
      <Stack.Screen
        name={Screen.FocusCheckStep2}
        component={FocusCheckStep2}
        options={optionsWithHeader('Focus check', 'focus')}
      />
      <Stack.Screen
        name={Screen.FocusCheckStep3}
        component={FocusCheckStep3}
        options={optionsWithHeader('Focus check', 'focus')}
      />
      <Stack.Screen
        name={Screen.FocusCheckStep4}
        component={FocusCheckStep4}
        options={optionsWithHeader('Focus check', 'focus')}
      />
      <Stack.Screen
        name={Screen.FocusCheckStep5}
        component={FocusCheckStep5}
        options={optionsWithHeader('Focus check', 'focus')}
      />
      <Stack.Screen
        name={Screen.Note}
        component={Note}
        options={{
          ...optionsWithHeader('Note'),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigate(Screen.NavTabs, { screen: Screen.Tools });
              }}
            />
          ),
        }}
      />
      <Stack.Screen name={Screen.Task} component={Task} />
      <Stack.Screen name={Screen.Trainer} component={Trainer} options={optionsWithHeader()} />
      <Stack.Screen name={Screen.EditStatusQuo} component={EditStatusQuo} options={optionsWithHeader()} />
      <Stack.Screen name={Screen.EditVision} component={EditVision} options={optionsWithHeader()} />
      <Stack.Screen name={Screen.EditPossibilities} component={EditPossibilities} options={optionsWithHeader()} />
      <Stack.Screen
        name={Screen.Disciplines}
        component={Disciplines}
        options={optionsWithHeader('Select Discipline')}
      />
      <Stack.Screen name={Screen.Discipline} component={Discipline} options={optionsWithHeader('Discipline')} />
      <Stack.Screen name={Screen.DisciplineTest} component={DisciplineTest} options={optionsWithHeader()} />
      <Stack.Screen
        name={Screen.Terms}
        component={Terms}
        options={{ ...optionsWithHeader('Terms'), animationEnabled: false }}
      />
      <Stack.Screen name={Screen.Privacy} component={Privacy} options={optionsWithHeader('Privacy')} />
      <Stack.Screen name={Screen.Support} component={Support} />
      <Stack.Screen name={Screen.CancelSubscription} component={CancelSubscription} options={optionsWithHeader()} />
      <Stack.Screen name={Screen.OnboardTerms} component={OnboardTerms} options={{ animationEnabled: false }} />
      <Stack.Screen name={Screen.OnboardPhoto} component={OnboardPhoto} options={{ animationEnabled: false }} />
      <Stack.Screen
        name={Screen.OnboardTrainerStep1}
        component={OnboardTrainerStep1}
        options={{ ...(!isOnboarding && optionsWithHeader('Trainer')), animationEnabled: false }}
      />
      <Stack.Screen
        name={Screen.OnboardTrainerStep2}
        component={OnboardTrainerStep2}
        options={{ animationEnabled: false }}
      />
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
                navigate(Screen.Me);
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default NavMain;
