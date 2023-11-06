import { RouteProp, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';

import { useSessionBookTime } from '@Context/SessionBookTimeContext';
import useSentryUser from '@Hooks/sentryUser';
import Camera, { CameraScreenParams } from '@Screens/Camera';
import CancelSubscription from '@Screens/CancelSubscription';
import Discipline, { DisciplineScreenParams } from '@Screens/Discipline';
import Disciplines from '@Screens/Disciplines';
import DisciplineTest from '@Screens/DisciplineTest';
import EditPossibilities from '@Screens/EditPossibilities';
import EditSettings from '@Screens/EditSettings';
import EditStatusQuo, { EditStatusQuoScreenParams } from '@Screens/EditStatusQuo';
import EditVision from '@Screens/EditVision';
import Focuscheck, { FocusCheckScreenParams } from '@Screens/Focuscheck';
import FocusCheckStart from '@Screens/FocusCheckStart';
import FocusCheckStep1, { FocusCheckStep1ScreenParams } from '@Screens/FocusCheckStep1';
import FocusCheckStep2, { FocusCheckStep2ScreenParams } from '@Screens/FocusCheckStep2';
import FocusCheckStep3, { FocusCheckStep3ScreenParams } from '@Screens/FocusCheckStep3';
import FocusCheckStep4, { FocusCheckStep4ScreenParams } from '@Screens/FocusCheckStep4';
import FocusCheckStep5, { FocusCheckStep5ScreenParams } from '@Screens/FocusCheckStep5';
import { Screen } from '@Screens/index';
import Messages from '@Screens/Messages';
import Note, { NoteScreenParams } from '@Screens/Note';
import NoteAdd, { NoteAddScreenParams } from '@Screens/NoteAdd';
import OnboardFinish from '@Screens/OnboardFinish';
import OnboardPhoto from '@Screens/OnboardPhoto';
import OnboardTerms from '@Screens/OnboardTerms';
import OnboardTrainerStep1 from '@Screens/OnboardTrainerStep1';
import OnboardTrainerStep2 from '@Screens/OnboardTrainerStep2';
import Privacy from '@Screens/Privacy';
import SessionBook, { SessionBookScreenParams } from '@Screens/SessionBook';
import Settings from '@Screens/Settings';
import SignOut from '@Screens/SignOut';
import StatusQuos from '@Screens/StatusQuos';
import Support from '@Screens/Support';
import Task, { TaskScreenParams } from '@Screens/Task';
import Terms from '@Screens/Terms';
import Trainer from '@Screens/Trainer';
import navStyleOptions from '@Styles/NavMain';

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
