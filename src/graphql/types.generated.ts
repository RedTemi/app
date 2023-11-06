import gql from 'graphql-tag';
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: string;
  AWSDateTime: string;
  AWSEmail: string;
  AWSIPAddress: string;
  AWSJSON: string;
  AWSPhone: string;
  AWSTime: string;
  AWSTimestamp: string;
  AWSURL: string;
};










export type AvailabilityStats = {
  __typename?: 'AvailabilityStats';
  month: Maybe<Scalars['String']>;
  slots: Maybe<Scalars['Int']>;
};

export type CardSignupInput = {
  comment?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  email: Scalars['AWSEmail'];
  language: Scalars['String'];
  name: Scalars['String'];
  tel: Scalars['String'];
  trainerId: Scalars['ID'];
  vat?: Maybe<Scalars['String']>;
};

export type Company = Node & {
  __typename?: 'Company';
  comments: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  endsOn: Maybe<Scalars['AWSDateTime']>;
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  nodeId: Scalars['ID'];
};

export type CompanyId = {
  __typename?: 'CompanyId';
  id: Scalars['ID'];
};

export type CompanyInput = {
  comments?: Maybe<Scalars['String']>;
  endsOn?: Maybe<Scalars['AWSDateTime']>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type EventInfo = {
  __typename?: 'EventInfo';
  created: Maybe<Scalars['AWSDateTime']>;
  htmlLink: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  updated: Maybe<Scalars['AWSDateTime']>;
};

export type Focuscheck = Node & {
  __typename?: 'Focuscheck';
  createdAt: Maybe<Scalars['AWSDateTime']>;
  id: Scalars['ID'];
  intentionForMe: Maybe<Scalars['String']>;
  intentionForOthers: Maybe<Scalars['String']>;
  investigation: Maybe<Scalars['String']>;
  nodeId: Scalars['ID'];
  participantId: Maybe<Scalars['ID']>;
  sessionId: Maybe<Scalars['ID']>;
  successCriteria: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['AWSDateTime']>;
};

export type Group = Node & {
  __typename?: 'Group';
  comments: Maybe<Scalars['String']>;
  company: Maybe<Company>;
  companyId: Maybe<Scalars['ID']>;
  createdAt: Scalars['AWSDateTime'];
  deletedAt: Maybe<Scalars['AWSDateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  nodeId: Scalars['ID'];
  participants: Array<Participant>;
  trainer: Trainer;
  trainerId: Scalars['ID'];
  updatedAt: Maybe<Scalars['AWSDateTime']>;
};

export type GroupId = {
  __typename?: 'GroupId';
  id: Scalars['ID'];
};

export type GroupInput = {
  comments?: Maybe<Scalars['String']>;
  companyId: Scalars['ID'];
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  trainerId: Scalars['ID'];
};

export type GroupSession = Node & {
  __typename?: 'GroupSession';
  comments: Maybe<Scalars['String']>;
  createdAt: Scalars['AWSDateTime'];
  deletedAt: Maybe<Scalars['AWSDateTime']>;
  duration: Scalars['Int'];
  group: Group;
  groupId: Scalars['ID'];
  id: Scalars['ID'];
  nodeId: Scalars['ID'];
  start: Scalars['AWSDateTime'];
  updatedAt: Maybe<Scalars['AWSDateTime']>;
};

export type GroupSessionCreateInput = {
  comments?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  groupId: Scalars['ID'];
  start: Scalars['AWSDateTime'];
};

export type GroupSessionId = {
  __typename?: 'GroupSessionId';
  id: Scalars['ID'];
};

export type GroupSessionUpdateInput = {
  comments?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  id: Scalars['ID'];
  start: Scalars['AWSDateTime'];
};

export type InvoiceSignupInput = {
  address: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
  company: Scalars['String'];
  currency: Scalars['String'];
  email: Scalars['AWSEmail'];
  language: Scalars['String'];
  name: Scalars['String'];
  tel: Scalars['String'];
  trainerId: Scalars['ID'];
  vat?: Maybe<Scalars['String']>;
};

export enum Language {
  Da = 'DA',
  En = 'EN'
}

export type Message = Node & {
  __typename?: 'Message';
  createdAt: Scalars['AWSDateTime'];
  fromId: Scalars['ID'];
  id: Scalars['ID'];
  message: Scalars['String'];
  nodeId: Scalars['ID'];
  read: Maybe<Scalars['Boolean']>;
  sessionId: Maybe<Scalars['ID']>;
  toId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cardSignup: Maybe<PaymentIntent>;
  companyCreate: Maybe<CompanyId>;
  companyDisable: Maybe<CompanyId>;
  companyUpdate: Maybe<CompanyId>;
  focuscheckAddAsParticipant: Maybe<Focuscheck>;
  focuscheckAddAsTrainer: Maybe<Focuscheck>;
  focuscheckDelete: Maybe<Task>;
  focuscheckUpdateAsParticipant: Maybe<Focuscheck>;
  focuscheckUpdateAsTrainer: Maybe<Focuscheck>;
  groupCreate: Maybe<GroupId>;
  groupDisable: Maybe<GroupId>;
  groupSessionCreate: Maybe<GroupSessionId>;
  groupSessionDisable: Maybe<GroupSessionId>;
  groupSessionUpdate: Maybe<GroupSessionId>;
  groupUpdate: Maybe<GroupId>;
  invoiceSignup: Maybe<PaymentIntent>;
  messageAddAsParticipant: Maybe<Message>;
  messageAddAsTrainer: Maybe<Message>;
  noteAddAsParticipant: Maybe<Note>;
  noteAddAsTrainer: Maybe<Note>;
  noteDeleteAsTrainer: Maybe<Task>;
  noteUpdateAsParticipant: Maybe<NoteId>;
  participantCreate: Maybe<ParticipantId>;
  participantDisable: Maybe<ParticipantId>;
  participantEnroll: Maybe<ParticipantId>;
  participantSetExponentPushToken: Maybe<ParticipantId>;
  participantSetGroup: Maybe<ParticipantId>;
  participantUpdate: Maybe<ParticipantId>;
  participantUpdateAsParticipant: Maybe<ParticipantId>;
  sessionBook: Maybe<SessionBooked>;
  sessionBookMultiple: Maybe<Array<Maybe<SessionBooked>>>;
  sessionDisable: Maybe<Session>;
  sessionMarkAsRecognition: Maybe<Session>;
  sessionMarkAsStatusQuo: Maybe<Session>;
  sessionSetStatus: Maybe<Session>;
  sessionUnmarkAsRecognition: Maybe<Session>;
  sessionUnmarkAsStatusQuo: Maybe<Session>;
  statusQuoAdd: Maybe<StatusQuoId>;
  statusQuoDelete: Maybe<StatusQuoId>;
  statusQuoUpdate: Maybe<StatusQuoId>;
  taskCloseAsParticipant: Maybe<Task>;
  taskCloseAsTrainer: Maybe<Task>;
  taskCreateAsTrainer: Maybe<Task>;
  taskDeleteAsTrainer: Maybe<Task>;
  taskOpenAsParticipant: Maybe<Task>;
  trainerCreate: Maybe<TrainerId>;
  trainerDisable: Maybe<TrainerId>;
  trainerUpdate: Maybe<TrainerId>;
  updateAvatar: Maybe<User>;
};


export type MutationCardSignupArgs = {
  client: CardSignupInput;
};


export type MutationCompanyCreateArgs = {
  company: CompanyInput;
};


export type MutationCompanyDisableArgs = {
  id: Scalars['ID'];
};


export type MutationCompanyUpdateArgs = {
  company: CompanyInput;
};


export type MutationFocuscheckAddAsParticipantArgs = {
  intentionForMe: Maybe<Scalars['String']>;
  intentionForOthers: Maybe<Scalars['String']>;
  investigation: Maybe<Scalars['String']>;
  sessionId: Maybe<Scalars['ID']>;
  successCriteria: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationFocuscheckAddAsTrainerArgs = {
  intentionForMe: Maybe<Scalars['String']>;
  intentionForOthers: Maybe<Scalars['String']>;
  investigation: Maybe<Scalars['String']>;
  participantId: Scalars['ID'];
  sessionId: Maybe<Scalars['ID']>;
  successCriteria: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationFocuscheckDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationFocuscheckUpdateAsParticipantArgs = {
  id: Scalars['ID'];
  intentionForMe: Maybe<Scalars['String']>;
  intentionForOthers: Maybe<Scalars['String']>;
  investigation: Maybe<Scalars['String']>;
  successCriteria: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};


export type MutationFocuscheckUpdateAsTrainerArgs = {
  id: Scalars['ID'];
  intentionForMe: Maybe<Scalars['String']>;
  intentionForOthers: Maybe<Scalars['String']>;
  investigation: Maybe<Scalars['String']>;
  successCriteria: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};


export type MutationGroupCreateArgs = {
  group: GroupInput;
};


export type MutationGroupDisableArgs = {
  id: Scalars['ID'];
};


export type MutationGroupSessionCreateArgs = {
  groupSession: GroupSessionCreateInput;
};


export type MutationGroupSessionDisableArgs = {
  id: Scalars['ID'];
};


export type MutationGroupSessionUpdateArgs = {
  groupSession: GroupSessionUpdateInput;
};


export type MutationGroupUpdateArgs = {
  group: GroupInput;
};


export type MutationInvoiceSignupArgs = {
  client: InvoiceSignupInput;
};


export type MutationMessageAddAsParticipantArgs = {
  message: Scalars['String'];
};


export type MutationMessageAddAsTrainerArgs = {
  message: Scalars['String'];
  toId: Scalars['ID'];
};


export type MutationNoteAddAsParticipantArgs = {
  note: Scalars['String'];
};


export type MutationNoteAddAsTrainerArgs = {
  note: Scalars['String'];
  participantId: Scalars['ID'];
  privacy: Scalars['Int'];
  sessionId: Scalars['ID'];
};


export type MutationNoteDeleteAsTrainerArgs = {
  id: Scalars['ID'];
};


export type MutationNoteUpdateAsParticipantArgs = {
  id: Scalars['ID'];
  note: Scalars['String'];
};


export type MutationParticipantCreateArgs = {
  participant: ParticipantCreateInput;
};


export type MutationParticipantDisableArgs = {
  id: Scalars['ID'];
};


export type MutationParticipantEnrollArgs = {
  id: Scalars['ID'];
};


export type MutationParticipantSetExponentPushTokenArgs = {
  token: Scalars['String'];
};


export type MutationParticipantSetGroupArgs = {
  groupId: Maybe<Scalars['ID']>;
  userId: Scalars['ID'];
};


export type MutationParticipantUpdateArgs = {
  participant: ParticipantUpdateInput;
};


export type MutationParticipantUpdateAsParticipantArgs = {
  participant: ParticipantUpdateAsParticipantInput;
};


export type MutationSessionBookArgs = {
  duration: Maybe<Scalars['Int']>;
  eventId: Maybe<Scalars['ID']>;
  start: Scalars['AWSDateTime'];
};


export type MutationSessionBookMultipleArgs = {
  timeList: Maybe<Array<Maybe<Scalars['AWSDateTime']>>>;
};


export type MutationSessionDisableArgs = {
  id: Scalars['ID'];
};


export type MutationSessionMarkAsRecognitionArgs = {
  id: Scalars['ID'];
};


export type MutationSessionMarkAsStatusQuoArgs = {
  id: Scalars['ID'];
};


export type MutationSessionSetStatusArgs = {
  id: Scalars['ID'];
  status: SessionStatus;
};


export type MutationSessionUnmarkAsRecognitionArgs = {
  id: Scalars['ID'];
};


export type MutationSessionUnmarkAsStatusQuoArgs = {
  id: Scalars['ID'];
};


export type MutationStatusQuoAddArgs = {
  statusQuo: Scalars['String'];
};


export type MutationStatusQuoDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationStatusQuoUpdateArgs = {
  id: Scalars['ID'];
  statusQuo: Scalars['String'];
};


export type MutationTaskCloseAsParticipantArgs = {
  id: Scalars['ID'];
};


export type MutationTaskCloseAsTrainerArgs = {
  id: Scalars['ID'];
};


export type MutationTaskCreateAsTrainerArgs = {
  description: Scalars['String'];
  participantId: Scalars['ID'];
  repeatType: Maybe<RepeatType>;
  sessionId: Maybe<Scalars['ID']>;
};


export type MutationTaskDeleteAsTrainerArgs = {
  id: Scalars['ID'];
};


export type MutationTaskOpenAsParticipantArgs = {
  id: Scalars['ID'];
};


export type MutationTrainerCreateArgs = {
  trainer: TrainerInput;
};


export type MutationTrainerDisableArgs = {
  id: Scalars['ID'];
};


export type MutationTrainerUpdateArgs = {
  trainer: TrainerInput;
};

export type Node = {
  nodeId: Scalars['ID'];
};

export type Note = Node & {
  __typename?: 'Note';
  createdAt: Maybe<Scalars['AWSDateTime']>;
  id: Scalars['ID'];
  nodeId: Scalars['ID'];
  note: Maybe<Scalars['String']>;
  participantId: Maybe<Scalars['ID']>;
  privacy: Maybe<Scalars['Int']>;
  sessionId: Maybe<Scalars['ID']>;
  trainerId: Maybe<Scalars['ID']>;
  updatedAt: Maybe<Scalars['AWSDateTime']>;
};

export type NoteId = {
  __typename?: 'NoteId';
  id: Scalars['ID'];
};

export type Participant = Node & {
  __typename?: 'Participant';
  company: Maybe<Company>;
  companyId: Maybe<Scalars['ID']>;
  createdAt: Scalars['AWSDateTime'];
  focusChecks: Maybe<Array<Focuscheck>>;
  group: Maybe<Group>;
  groupId: Maybe<Scalars['ID']>;
  groupSessions: Array<GroupSession>;
  language: Maybe<Language>;
  nodeId: Scalars['ID'];
  note: Maybe<Scalars['String']>;
  notes: Maybe<Array<Note>>;
  phoneOS: Maybe<PhoneOs>;
  possibilities: Maybe<Scalars['String']>;
  sessionStats: SessionStats;
  sessions: Array<Session>;
  sessionsLeft: Maybe<Scalars['Int']>;
  status: ParticipantStatus;
  statusQuo: Maybe<Scalars['String']>;
  statusQuos: Array<StatusQuo>;
  subscriptionLength: Maybe<Scalars['Int']>;
  tasks: Maybe<Array<Task>>;
  tel: Maybe<Scalars['String']>;
  trainer: Trainer;
  trainerId: Maybe<Scalars['ID']>;
  traitName: Maybe<Scalars['String']>;
  type: Maybe<ParticipantType>;
  unenrolledAt: Maybe<Scalars['AWSDateTime']>;
  updatedAt: Maybe<Scalars['AWSDateTime']>;
  user: User;
  userId: Scalars['ID'];
  vatCode: Maybe<Scalars['String']>;
  vision: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ParticipantCreateInput = {
  companyId?: Maybe<Scalars['ID']>;
  email: Scalars['AWSEmail'];
  groupId?: Maybe<Scalars['ID']>;
  language?: Maybe<Language>;
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  phoneOS?: Maybe<PhoneOs>;
  status?: Maybe<ParticipantStatus>;
  subscriptionLength?: Maybe<Scalars['Int']>;
  tel?: Maybe<Scalars['String']>;
  trainerId: Scalars['ID'];
  type?: Maybe<ParticipantType>;
  vatCode?: Maybe<Scalars['String']>;
};

export type ParticipantId = {
  __typename?: 'ParticipantId';
  userId: Scalars['ID'];
};

export enum ParticipantStatus {
  Activated = 'activated',
  Created = 'created',
  Unenrolled = 'unenrolled'
}

export enum ParticipantType {
  B2B = 'B2B',
  B2C = 'B2C',
  Exec = 'Exec',
  Free = 'Free',
  Trial = 'Trial'
}

export type ParticipantUpdateAsParticipantInput = {
  avatar?: Maybe<Scalars['AWSURL']>;
  email?: Maybe<Scalars['AWSEmail']>;
  name?: Maybe<Scalars['String']>;
  possibilities?: Maybe<Scalars['String']>;
  statusQuo?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
  traitName?: Maybe<Scalars['String']>;
  vatCode?: Maybe<Scalars['String']>;
  vision?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ParticipantUpdateInput = {
  companyId?: Maybe<Scalars['ID']>;
  email: Scalars['AWSEmail'];
  groupId?: Maybe<Scalars['ID']>;
  language?: Maybe<Language>;
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  phoneOS?: Maybe<PhoneOs>;
  status: ParticipantStatus;
  subscriptionLength?: Maybe<Scalars['Int']>;
  tel: Scalars['String'];
  trainerId: Scalars['ID'];
  type?: Maybe<ParticipantType>;
  userId: Scalars['ID'];
  vatCode?: Maybe<Scalars['String']>;
};

export type PaymentIntent = {
  __typename?: 'PaymentIntent';
  error: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export enum PhoneOs {
  Android = 'Android',
  IOs = 'iOS'
}

export type PublicParticipant = Node & {
  __typename?: 'PublicParticipant';
  nodeId: Scalars['ID'];
  sessions: Array<PublicSession>;
  trainer: PublicUser;
  user: PublicUser;
  userId: Scalars['ID'];
};

export type PublicSession = Node & {
  __typename?: 'PublicSession';
  nodeId: Scalars['ID'];
  start: Scalars['AWSDateTime'];
};

export type PublicTrainer = Node & {
  __typename?: 'PublicTrainer';
  languages: Maybe<Array<Maybe<Scalars['String']>>>;
  nodeId: Scalars['ID'];
  trainer: PublicUser;
  userId: Scalars['ID'];
};

export type PublicUser = Node & {
  __typename?: 'PublicUser';
  name: Scalars['String'];
  nodeId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  allSessionsDatesAsSelf: Array<SessionDate>;
  companyGet: Maybe<Company>;
  companyList: Array<Company>;
  focuscheckGetAsParticipant: Maybe<Focuscheck>;
  focuscheckListAsParticipant: Maybe<Array<Maybe<Focuscheck>>>;
  getSignedUrl: Maybe<SignedUrl>;
  getStatisticsCompanies: Array<StatisticsCompanies>;
  getStatisticsGeneral: Array<StatisticsGeneral>;
  getUnmatchedClients: Array<StripeSession>;
  groupGet: Maybe<Group>;
  groupList: Array<Group>;
  groupSessionGet: Maybe<GroupSession>;
  groupSessionList: Array<GroupSession>;
  groupSessionListAsSelf: Array<GroupSession>;
  messageList: Maybe<Array<Maybe<Message>>>;
  messageListAsTrainer: Maybe<Array<Maybe<Message>>>;
  noteAsParticipant: Maybe<Note>;
  noteListAsParticipant: Maybe<Array<Maybe<Note>>>;
  noteListAsTrainer: Maybe<Array<Maybe<Note>>>;
  participantGet: Maybe<Participant>;
  participantGetAsParticipant: Maybe<Participant>;
  participantGetAsTrainer: Maybe<Participant>;
  participantGetPublic: Maybe<PublicParticipant>;
  participantList: Array<Participant>;
  participantsListForGroup: Array<Participant>;
  sessionGet: Maybe<Session>;
  sessionGetAsAdmin: Maybe<Session>;
  sessionGetAsTrainer: Maybe<Session>;
  sessionList: Array<Session>;
  sessionListAsParticipant: Array<Session>;
  sessionListAsSelf: Array<Session>;
  taskAsParticipant: Task;
  taskListAsParticipant: Maybe<Array<Task>>;
  trainerAvailability: Maybe<Array<Maybe<TrainerAvailability>>>;
  trainerAvailabilityAsAdmin: Maybe<Array<Maybe<TrainerAvailability>>>;
  trainerAvailabilityAsTrainer: Maybe<Array<Maybe<TrainerAvailability>>>;
  trainerCalendars: Maybe<Array<Maybe<TrainerCalendars>>>;
  trainerGet: Maybe<Trainer>;
  trainerGetSelf: Maybe<Trainer>;
  trainerList: Maybe<Array<Maybe<Trainer>>>;
  trainerListPublic: Maybe<Array<PublicTrainer>>;
  trainersAvailability: Maybe<Array<Maybe<TrainersAvailability>>>;
};


export type QueryCompanyGetArgs = {
  id: Scalars['ID'];
};


export type QueryFocuscheckGetAsParticipantArgs = {
  id: Scalars['ID'];
};


export type QueryGetStatisticsCompaniesArgs = {
  from: Maybe<Scalars['AWSDateTime']>;
  to: Maybe<Scalars['AWSDateTime']>;
};


export type QueryGetStatisticsGeneralArgs = {
  from: Maybe<Scalars['AWSDateTime']>;
  to: Maybe<Scalars['AWSDateTime']>;
};


export type QueryGroupGetArgs = {
  id: Scalars['ID'];
};


export type QueryGroupSessionGetArgs = {
  id: Scalars['ID'];
};


export type QueryGroupSessionListArgs = {
  groupId: Scalars['ID'];
};


export type QueryGroupSessionListAsSelfArgs = {
  from: Maybe<Scalars['AWSDateTime']>;
  to: Maybe<Scalars['AWSDateTime']>;
};


export type QueryMessageListAsTrainerArgs = {
  participantId: Scalars['ID'];
};


export type QueryNoteAsParticipantArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantGetArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantGetAsTrainerArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantGetPublicArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantsListForGroupArgs = {
  groupId: Scalars['ID'];
};


export type QuerySessionGetArgs = {
  id: Scalars['ID'];
};


export type QuerySessionGetAsAdminArgs = {
  id: Scalars['ID'];
};


export type QuerySessionGetAsTrainerArgs = {
  id: Scalars['ID'];
};


export type QuerySessionListArgs = {
  from: Maybe<Scalars['AWSDateTime']>;
  to: Maybe<Scalars['AWSDateTime']>;
};


export type QuerySessionListAsSelfArgs = {
  from: Maybe<Scalars['AWSDateTime']>;
  to: Maybe<Scalars['AWSDateTime']>;
};


export type QueryTaskAsParticipantArgs = {
  id: Scalars['ID'];
};


export type QueryTrainerAvailabilityArgs = {
  days: Maybe<Scalars['Int']>;
  duration: Maybe<Scalars['Int']>;
  start: Maybe<Scalars['AWSDateTime']>;
};


export type QueryTrainerAvailabilityAsAdminArgs = {
  days: Maybe<Scalars['Int']>;
  duration: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  start: Maybe<Scalars['AWSDateTime']>;
};


export type QueryTrainerAvailabilityAsTrainerArgs = {
  days: Maybe<Scalars['Int']>;
  duration: Maybe<Scalars['Int']>;
  start: Maybe<Scalars['AWSDateTime']>;
};


export type QueryTrainerCalendarsArgs = {
  email: Scalars['AWSEmail'];
};


export type QueryTrainerGetArgs = {
  id: Scalars['ID'];
};


export type QueryTrainersAvailabilityArgs = {
  duration: Maybe<Scalars['Int']>;
};

export enum RepeatType {
  Daily = 'daily',
  Once = 'once',
  Weekly = 'weekly'
}

export type Session = Node & {
  __typename?: 'Session';
  createdAt: Maybe<Scalars['AWSDateTime']>;
  deletedAt: Maybe<Scalars['AWSDateTime']>;
  duration: Maybe<Scalars['Int']>;
  eventId: Maybe<Scalars['ID']>;
  eventInfo: Maybe<EventInfo>;
  focusChecks: Maybe<Array<Focuscheck>>;
  id: Scalars['ID'];
  markedRecognitionAt: Maybe<Scalars['AWSDateTime']>;
  markedStatusQuoAt: Maybe<Scalars['AWSDateTime']>;
  nodeId: Scalars['ID'];
  notes: Array<Note>;
  participant: Maybe<Participant>;
  participantId: Maybe<Scalars['ID']>;
  sessionNo: Maybe<Scalars['Int']>;
  start: Scalars['AWSDateTime'];
  status: Maybe<SessionStatus>;
  tasks: Maybe<Array<Task>>;
  trainer: Maybe<Trainer>;
  trainerId: Maybe<Scalars['ID']>;
  updatedAt: Maybe<Scalars['AWSDateTime']>;
};

export type SessionBooked = {
  __typename?: 'SessionBooked';
  id: Scalars['ID'];
};

export type SessionDate = {
  __typename?: 'SessionDate';
  start: Scalars['AWSDateTime'];
  type: Scalars['String'];
};

export type SessionStats = {
  __typename?: 'SessionStats';
  booked: Scalars['Int'];
  held: Scalars['Int'];
  next: Maybe<Scalars['AWSDateTime']>;
  noshow: Scalars['Int'];
  previous: Maybe<Scalars['AWSDateTime']>;
  total: Scalars['Int'];
  upcoming: Scalars['Int'];
};

export enum SessionStatus {
  Complete = 'complete',
  Deleted = 'deleted',
  Noshow = 'noshow'
}

export type SignedUrl = {
  __typename?: 'SignedUrl';
  formdata: Scalars['AWSJSON'];
};

export type StatisticsCompanies = {
  __typename?: 'StatisticsCompanies';
  completeSessions: Scalars['Int'];
  createdAt: Scalars['AWSDateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  participantCount: Scalars['Int'];
  teamSessions: Scalars['Int'];
};

export type StatisticsGeneral = {
  __typename?: 'StatisticsGeneral';
  activeCoaches: Scalars['Int'];
  activeParticipants: Scalars['Int'];
  createdAt: Scalars['AWSDateTime'];
  participantsB2B: Scalars['Int'];
  participantsB2C: Scalars['Int'];
  participantsEXEC: Scalars['Int'];
  participantsFREE: Scalars['Int'];
  participantsTRIAL: Scalars['Int'];
  zeroBooked: Scalars['Int'];
};

export type StatusQuo = Node & {
  __typename?: 'StatusQuo';
  createdAt: Scalars['AWSDateTime'];
  id: Maybe<Scalars['ID']>;
  nodeId: Scalars['ID'];
  statusQuo: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['AWSDateTime']>;
};

export type StatusQuoId = {
  __typename?: 'StatusQuoId';
  id: Scalars['ID'];
};

export type StripeSession = {
  __typename?: 'StripeSession';
  amount: Maybe<Scalars['Int']>;
  createdAt: Scalars['AWSDateTime'];
  email: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  tel: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Maybe<Message>;
};


export type SubscriptionMessageAddedArgs = {
  fromId: Maybe<Scalars['ID']>;
  toId: Maybe<Scalars['ID']>;
};

export type Task = Node & {
  __typename?: 'Task';
  completedAt: Maybe<Scalars['AWSDateTime']>;
  createdAt: Scalars['AWSDateTime'];
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  nodeId: Scalars['ID'];
  participantId: Maybe<Scalars['ID']>;
  repeatType: Maybe<RepeatType>;
  trainerId: Maybe<Scalars['ID']>;
};

export type Trainer = Node & {
  __typename?: 'Trainer';
  airtable: Maybe<Scalars['String']>;
  background: Maybe<Scalars['String']>;
  calendars: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt: Scalars['AWSDateTime'];
  facetimeId: Maybe<Scalars['String']>;
  keywords: Maybe<Array<Maybe<Scalars['String']>>>;
  languages: Maybe<Array<Maybe<Scalars['String']>>>;
  nodeId: Scalars['ID'];
  participants: Maybe<Array<Participant>>;
  skypeId: Maybe<Scalars['String']>;
  tel: Maybe<Scalars['String']>;
  timezone: Maybe<Scalars['Int']>;
  updatedAt: Maybe<Scalars['AWSDateTime']>;
  user: User;
  userId: Scalars['ID'];
};

export type TrainerAvailability = {
  __typename?: 'TrainerAvailability';
  end: Maybe<Scalars['AWSDateTime']>;
  start: Maybe<Scalars['AWSDateTime']>;
};

export type TrainerCalendars = {
  __typename?: 'TrainerCalendars';
  id: Scalars['String'];
  summary: Scalars['String'];
};

export type TrainerId = {
  __typename?: 'TrainerId';
  userId: Scalars['ID'];
};

export type TrainerInput = {
  airtable?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
  calendars?: Maybe<Array<Maybe<Scalars['String']>>>;
  email: Scalars['AWSEmail'];
  facetimeId?: Maybe<Scalars['String']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  skypeId?: Maybe<Scalars['String']>;
  tel?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['ID']>;
};

export type TrainersAvailability = {
  __typename?: 'TrainersAvailability';
  availability: Maybe<Array<Maybe<AvailabilityStats>>>;
  trainerId: Scalars['ID'];
};

export type User = Node & {
  __typename?: 'User';
  avatar: Maybe<Scalars['AWSURL']>;
  email: Scalars['AWSEmail'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nodeId: Scalars['ID'];
};

export type FocuscheckAddAsParticipantMutationVariables = Exact<{
  title: Scalars['String'];
  intentionForMe: Maybe<Scalars['String']>;
  intentionForOthers: Maybe<Scalars['String']>;
  investigation: Maybe<Scalars['String']>;
  successCriteria: Maybe<Scalars['String']>;
  sessionId: Maybe<Scalars['ID']>;
}>;


export type FocuscheckAddAsParticipantMutation = { __typename?: 'Mutation', focuscheckAddAsParticipant: Maybe<{ __typename?: 'Focuscheck', id: string, nodeId: string, createdAt: Maybe<string>, title: Maybe<string>, intentionForMe: Maybe<string>, intentionForOthers: Maybe<string>, investigation: Maybe<string>, successCriteria: Maybe<string> }> };

export type FocuscheckContentFragment = { __typename?: 'Focuscheck', id: string, nodeId: string, createdAt: Maybe<string>, title: Maybe<string>, intentionForMe: Maybe<string>, intentionForOthers: Maybe<string>, investigation: Maybe<string>, successCriteria: Maybe<string> };

export type MessageContentFragment = { __typename?: 'Message', id: string, nodeId: string, fromId: string, toId: string, message: string, createdAt: string };

export type NoteContentFragment = { __typename?: 'Note', nodeId: string, note: Maybe<string>, createdAt: Maybe<string>, privacy: Maybe<number> };

export type SessionContentFragment = { __typename?: 'Session', nodeId: string, eventId: Maybe<string>, start: string, duration: Maybe<number>, status: Maybe<SessionStatus>, sessionNo: Maybe<number>, trainerId: Maybe<string>, markedRecognitionAt: Maybe<string>, trainer: Maybe<{ __typename?: 'Trainer', facetimeId: Maybe<string>, skypeId: Maybe<string>, tel: Maybe<string>, user: { __typename?: 'User', name: string, avatar: Maybe<string> } }>, notes: Array<{ __typename?: 'Note', note: Maybe<string>, nodeId: string, createdAt: Maybe<string>, updatedAt: Maybe<string> }>, focusChecks: Maybe<Array<{ __typename?: 'Focuscheck', nodeId: string }>>, tasks: Maybe<Array<{ __typename?: 'Task', nodeId: string, description: Maybe<string>, completedAt: Maybe<string> }>> };

export type TaskContentFragment = { __typename?: 'Task', id: string, nodeId: string, createdAt: string, description: Maybe<string>, repeatType: Maybe<RepeatType>, completedAt: Maybe<string> };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', participantGetAsParticipant: Maybe<{ __typename?: 'Participant', nodeId: string, trainer: { __typename?: 'Trainer', user: { __typename?: 'User', name: string, avatar: Maybe<string> } } }>, taskListAsParticipant: Maybe<Array<{ __typename?: 'Task', id: string, nodeId: string, createdAt: string, description: Maybe<string>, repeatType: Maybe<RepeatType>, completedAt: Maybe<string> }>> };

export type MessageAddAsParticipantMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type MessageAddAsParticipantMutation = { __typename?: 'Mutation', messageAddAsParticipant: Maybe<{ __typename?: 'Message', id: string, nodeId: string, fromId: string, toId: string, message: string, createdAt: string }> };

export type MessageAddedSubscriptionVariables = Exact<{
  toId: Scalars['ID'];
}>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: Maybe<{ __typename?: 'Message', id: string, nodeId: string, fromId: string, toId: string, message: string, createdAt: string }> };

export type MessageListQueryVariables = Exact<{ [key: string]: never; }>;


export type MessageListQuery = { __typename?: 'Query', participantGetAsParticipant: Maybe<{ __typename?: 'Participant', nodeId: string, userId: string, trainer: { __typename?: 'Trainer', user: { __typename?: 'User', name: string, avatar: Maybe<string> } } }>, messageList: Maybe<Array<Maybe<{ __typename?: 'Message', id: string, nodeId: string, fromId: string, toId: string, message: string, createdAt: string }>>> };

export type FocuscheckDeleteMutationVariables = Exact<{
  focusCheckId: Scalars['ID'];
}>;


export type FocuscheckDeleteMutation = { __typename?: 'Mutation', focuscheckDelete: Maybe<{ __typename?: 'Task', id: string }> };

export type FocuscheckUpdateAsParticipantMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Maybe<Scalars['String']>;
  intentionForMe: Maybe<Scalars['String']>;
  intentionForOthers: Maybe<Scalars['String']>;
  investigation: Maybe<Scalars['String']>;
  successCriteria: Maybe<Scalars['String']>;
}>;


export type FocuscheckUpdateAsParticipantMutation = { __typename?: 'Mutation', focuscheckUpdateAsParticipant: Maybe<{ __typename?: 'Focuscheck', id: string, nodeId: string, createdAt: Maybe<string>, title: Maybe<string>, intentionForMe: Maybe<string>, intentionForOthers: Maybe<string>, investigation: Maybe<string>, successCriteria: Maybe<string> }> };

export type ParticipantSetExponentPushTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ParticipantSetExponentPushTokenMutation = { __typename?: 'Mutation', participantSetExponentPushToken: Maybe<{ __typename?: 'ParticipantId', userId: string }> };

export type ParticipantUpdateAsParticipantMutationVariables = Exact<{
  participant: ParticipantUpdateAsParticipantInput;
}>;


export type ParticipantUpdateAsParticipantMutation = { __typename?: 'Mutation', participantUpdateAsParticipant: Maybe<{ __typename?: 'ParticipantId', userId: string }> };

export type SessionBookMultipleMutationVariables = Exact<{
  timeList: Maybe<Array<Maybe<Scalars['AWSDateTime']>> | Maybe<Scalars['AWSDateTime']>>;
}>;


export type SessionBookMultipleMutation = { __typename?: 'Mutation', sessionBookMultiple: Maybe<Array<Maybe<{ __typename?: 'SessionBooked', id: string }>>> };

export type SessionBookMutationVariables = Exact<{
  start: Scalars['AWSDateTime'];
  eventId: Maybe<Scalars['ID']>;
}>;


export type SessionBookMutation = { __typename?: 'Mutation', sessionBook: Maybe<{ __typename?: 'SessionBooked', id: string }> };

export type SessionDisableMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SessionDisableMutation = { __typename?: 'Mutation', sessionDisable: Maybe<{ __typename?: 'Session', id: string }> };

export type StatusQuoAddMutationVariables = Exact<{
  statusQuo: Scalars['String'];
}>;


export type StatusQuoAddMutation = { __typename?: 'Mutation', statusQuoAdd: Maybe<{ __typename?: 'StatusQuoId', id: string }> };

export type StatusQuoUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  statusQuo: Scalars['String'];
}>;


export type StatusQuoUpdateMutation = { __typename?: 'Mutation', statusQuoUpdate: Maybe<{ __typename?: 'StatusQuoId', id: string }> };

export type TaskCloseAsParticipantMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TaskCloseAsParticipantMutation = { __typename?: 'Mutation', taskCloseAsParticipant: Maybe<{ __typename?: 'Task', id: string }> };

export type TaskOpenAsParticipantMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TaskOpenAsParticipantMutation = { __typename?: 'Mutation', taskOpenAsParticipant: Maybe<{ __typename?: 'Task', id: string }> };

export type UpdateAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatar: Maybe<{ __typename?: 'User', id: string }> };

export type NoteAddAsParticipantMutationVariables = Exact<{
  note: Scalars['String'];
}>;


export type NoteAddAsParticipantMutation = { __typename?: 'Mutation', noteAddAsParticipant: Maybe<{ __typename?: 'Note', nodeId: string, note: Maybe<string>, createdAt: Maybe<string>, privacy: Maybe<number> }> };

export type NoteUpdateAsParticipantMutationVariables = Exact<{
  id: Scalars['ID'];
  note: Scalars['String'];
}>;


export type NoteUpdateAsParticipantMutation = { __typename?: 'Mutation', noteUpdateAsParticipant: Maybe<{ __typename?: 'NoteId', id: string }> };

export type ParticipantDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type ParticipantDetailsQuery = { __typename?: 'Query', participantGetAsParticipant: Maybe<{ __typename?: 'Participant', nodeId: string, userId: string, possibilities: Maybe<string>, traitName: Maybe<string>, vision: Maybe<Array<Maybe<string>>>, statusQuos: Array<{ __typename?: 'StatusQuo', nodeId: string, statusQuo: Maybe<string>, createdAt: string }>, user: { __typename?: 'User', name: string, avatar: Maybe<string> }, trainer: { __typename?: 'Trainer', user: { __typename?: 'User', name: string, avatar: Maybe<string> } } }> };

export type ParticipantSessionStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ParticipantSessionStatsQuery = { __typename?: 'Query', participantGetAsParticipant: Maybe<{ __typename?: 'Participant', nodeId: string, sessionStats: { __typename?: 'SessionStats', total: number, previous: Maybe<string> }, trainer: { __typename?: 'Trainer', user: { __typename?: 'User', name: string } } }> };

export type FocuscheckGetAsParticipantQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FocuscheckGetAsParticipantQuery = { __typename?: 'Query', focuscheckGetAsParticipant: Maybe<{ __typename?: 'Focuscheck', nodeId: string, createdAt: Maybe<string>, title: Maybe<string>, intentionForMe: Maybe<string>, intentionForOthers: Maybe<string>, investigation: Maybe<string>, successCriteria: Maybe<string> }> };

export type NoteAsParticipantQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NoteAsParticipantQuery = { __typename?: 'Query', noteAsParticipant: Maybe<{ __typename?: 'Note', nodeId: string, createdAt: Maybe<string>, updatedAt: Maybe<string>, sessionId: Maybe<string>, note: Maybe<string>, privacy: Maybe<number> }> };

export type SessionBookDataQueryVariables = Exact<{
  start: Maybe<Scalars['AWSDateTime']>;
  days: Maybe<Scalars['Int']>;
}>;


export type SessionBookDataQuery = { __typename?: 'Query', trainerAvailability: Maybe<Array<Maybe<{ __typename?: 'TrainerAvailability', start: Maybe<string> }>>> };

export type ParticipantSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ParticipantSettingsQuery = { __typename?: 'Query', participantGetAsParticipant: Maybe<{ __typename?: 'Participant', nodeId: string, createdAt: string, user: { __typename?: 'User', name: string, avatar: Maybe<string> } }> };

export type TaskAsParticipantQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TaskAsParticipantQuery = { __typename?: 'Query', taskAsParticipant: { __typename?: 'Task', nodeId: string, description: Maybe<string>, completedAt: Maybe<string> } };

export type ParticipantTrainerQueryVariables = Exact<{ [key: string]: never; }>;


export type ParticipantTrainerQuery = { __typename?: 'Query', participantGetAsParticipant: Maybe<{ __typename?: 'Participant', nodeId: string, trainer: { __typename?: 'Trainer', background: Maybe<string>, keywords: Maybe<Array<Maybe<string>>>, user: { __typename?: 'User', name: string, avatar: Maybe<string> } } }> };

export type GetSignedUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSignedUrlQuery = { __typename?: 'Query', getSignedUrl: Maybe<{ __typename?: 'SignedUrl', formdata: string }> };

export type SessionGetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SessionGetQuery = { __typename?: 'Query', sessionGet: Maybe<{ __typename?: 'Session', nodeId: string, eventId: Maybe<string>, start: string, duration: Maybe<number>, status: Maybe<SessionStatus>, sessionNo: Maybe<number>, trainerId: Maybe<string>, markedRecognitionAt: Maybe<string>, trainer: Maybe<{ __typename?: 'Trainer', facetimeId: Maybe<string>, skypeId: Maybe<string>, tel: Maybe<string>, user: { __typename?: 'User', name: string, avatar: Maybe<string> } }>, notes: Array<{ __typename?: 'Note', note: Maybe<string>, nodeId: string, createdAt: Maybe<string>, updatedAt: Maybe<string> }>, focusChecks: Maybe<Array<{ __typename?: 'Focuscheck', nodeId: string }>>, tasks: Maybe<Array<{ __typename?: 'Task', nodeId: string, description: Maybe<string>, completedAt: Maybe<string> }>> }> };

export type SessionsBookScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionsBookScreenQuery = { __typename?: 'Query', sessionListAsParticipant: Array<{ __typename?: 'Session', nodeId: string, eventId: Maybe<string>, start: string, duration: Maybe<number>, status: Maybe<SessionStatus>, sessionNo: Maybe<number>, trainerId: Maybe<string>, markedRecognitionAt: Maybe<string>, trainer: Maybe<{ __typename?: 'Trainer', facetimeId: Maybe<string>, skypeId: Maybe<string>, tel: Maybe<string>, user: { __typename?: 'User', name: string, avatar: Maybe<string> } }>, notes: Array<{ __typename?: 'Note', note: Maybe<string>, nodeId: string, createdAt: Maybe<string>, updatedAt: Maybe<string> }>, focusChecks: Maybe<Array<{ __typename?: 'Focuscheck', nodeId: string }>>, tasks: Maybe<Array<{ __typename?: 'Task', nodeId: string, description: Maybe<string>, completedAt: Maybe<string> }>> }> };

export type SessionsNextQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionsNextQuery = { __typename?: 'Query', sessionListAsParticipant: Array<{ __typename?: 'Session', nodeId: string, eventId: Maybe<string>, start: string, duration: Maybe<number>, status: Maybe<SessionStatus>, sessionNo: Maybe<number>, trainerId: Maybe<string>, markedRecognitionAt: Maybe<string>, trainer: Maybe<{ __typename?: 'Trainer', facetimeId: Maybe<string>, skypeId: Maybe<string>, tel: Maybe<string>, user: { __typename?: 'User', name: string, avatar: Maybe<string> } }>, notes: Array<{ __typename?: 'Note', note: Maybe<string>, nodeId: string, createdAt: Maybe<string>, updatedAt: Maybe<string> }>, focusChecks: Maybe<Array<{ __typename?: 'Focuscheck', nodeId: string }>>, tasks: Maybe<Array<{ __typename?: 'Task', nodeId: string, description: Maybe<string>, completedAt: Maybe<string> }>> }> };

export type SessionsScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionsScreenQuery = { __typename?: 'Query', sessionListAsParticipant: Array<{ __typename?: 'Session', nodeId: string, eventId: Maybe<string>, start: string, duration: Maybe<number>, status: Maybe<SessionStatus>, sessionNo: Maybe<number>, trainerId: Maybe<string>, markedRecognitionAt: Maybe<string>, trainer: Maybe<{ __typename?: 'Trainer', facetimeId: Maybe<string>, skypeId: Maybe<string>, tel: Maybe<string>, user: { __typename?: 'User', name: string, avatar: Maybe<string> } }>, notes: Array<{ __typename?: 'Note', note: Maybe<string>, nodeId: string, createdAt: Maybe<string>, updatedAt: Maybe<string> }>, focusChecks: Maybe<Array<{ __typename?: 'Focuscheck', nodeId: string }>>, tasks: Maybe<Array<{ __typename?: 'Task', nodeId: string, description: Maybe<string>, completedAt: Maybe<string> }>> }>, participantGetAsParticipant: Maybe<{ __typename?: 'Participant', nodeId: string, trainerId: Maybe<string>, sessionStats: { __typename?: 'SessionStats', upcoming: number, booked: number } }> };

export type TaskListAsParticipantQueryVariables = Exact<{ [key: string]: never; }>;


export type TaskListAsParticipantQuery = { __typename?: 'Query', taskListAsParticipant: Maybe<Array<{ __typename?: 'Task', id: string, nodeId: string, createdAt: string, description: Maybe<string>, repeatType: Maybe<RepeatType>, completedAt: Maybe<string> }>> };

export type ToolsQueryVariables = Exact<{ [key: string]: never; }>;


export type ToolsQuery = { __typename?: 'Query', noteListAsParticipant: Maybe<Array<Maybe<{ __typename?: 'Note', nodeId: string, createdAt: Maybe<string>, updatedAt: Maybe<string>, sessionId: Maybe<string>, note: Maybe<string>, privacy: Maybe<number> }>>>, focuscheckListAsParticipant: Maybe<Array<Maybe<{ __typename?: 'Focuscheck', nodeId: string, createdAt: Maybe<string>, updatedAt: Maybe<string>, sessionId: Maybe<string>, title: Maybe<string>, intentionForMe: Maybe<string>, intentionForOthers: Maybe<string>, investigation: Maybe<string>, successCriteria: Maybe<string> }>>>, sessionListAsParticipant: Array<{ __typename?: 'Session', nodeId: string, start: string, status: Maybe<SessionStatus> }> };

export const FocuscheckContentFragmentDoc = gql`
    fragment FocuscheckContent on Focuscheck {
  id
  nodeId
  createdAt
  title
  intentionForMe
  intentionForOthers
  investigation
  successCriteria
}
    `;
export const MessageContentFragmentDoc = gql`
    fragment MessageContent on Message {
  id
  nodeId
  fromId
  toId
  message
  createdAt
}
    `;
export const NoteContentFragmentDoc = gql`
    fragment NoteContent on Note {
  nodeId
  note
  createdAt
  privacy
}
    `;
export const SessionContentFragmentDoc = gql`
    fragment SessionContent on Session {
  nodeId
  eventId
  start
  duration
  status
  sessionNo
  trainerId
  markedRecognitionAt
  trainer {
    facetimeId
    skypeId
    tel
    user {
      name
      avatar
    }
  }
  notes {
    note
    nodeId
    createdAt
    updatedAt
  }
  focusChecks {
    nodeId
  }
  tasks {
    nodeId
    description
    completedAt
  }
}
    `;
export const TaskContentFragmentDoc = gql`
    fragment TaskContent on Task {
  id
  nodeId
  createdAt
  description
  repeatType
  completedAt
}
    `;
export const FocuscheckAddAsParticipantDocument = gql`
    mutation focuscheckAddAsParticipant($title: String!, $intentionForMe: String, $intentionForOthers: String, $investigation: String, $successCriteria: String, $sessionId: ID) {
  focuscheckAddAsParticipant(
    title: $title
    intentionForMe: $intentionForMe
    intentionForOthers: $intentionForOthers
    investigation: $investigation
    successCriteria: $successCriteria
    sessionId: $sessionId
  ) {
    ...FocuscheckContent
  }
}
    ${FocuscheckContentFragmentDoc}`;
export const HomeDocument = gql`
    query home {
  participantGetAsParticipant {
    nodeId
    trainer {
      user {
        name
        avatar
      }
    }
  }
  taskListAsParticipant {
    ...TaskContent
  }
}
    ${TaskContentFragmentDoc}`;
export const MessageAddAsParticipantDocument = gql`
    mutation messageAddAsParticipant($message: String!) {
  messageAddAsParticipant(message: $message) {
    ...MessageContent
  }
}
    ${MessageContentFragmentDoc}`;
export const MessageAddedDocument = gql`
    subscription messageAdded($toId: ID!) {
  messageAdded(toId: $toId) {
    ...MessageContent
  }
}
    ${MessageContentFragmentDoc}`;
export const MessageListDocument = gql`
    query messageList {
  participantGetAsParticipant {
    nodeId
    userId
    trainer {
      user {
        name
        avatar
      }
    }
  }
  messageList {
    ...MessageContent
  }
}
    ${MessageContentFragmentDoc}`;
export const FocuscheckDeleteDocument = gql`
    mutation focuscheckDelete($focusCheckId: ID!) {
  focuscheckDelete(id: $focusCheckId) {
    id
  }
}
    `;
export const FocuscheckUpdateAsParticipantDocument = gql`
    mutation focuscheckUpdateAsParticipant($id: ID!, $title: String, $intentionForMe: String, $intentionForOthers: String, $investigation: String, $successCriteria: String) {
  focuscheckUpdateAsParticipant(
    id: $id
    title: $title
    intentionForMe: $intentionForMe
    intentionForOthers: $intentionForOthers
    investigation: $investigation
    successCriteria: $successCriteria
  ) {
    ...FocuscheckContent
  }
}
    ${FocuscheckContentFragmentDoc}`;
export const ParticipantSetExponentPushTokenDocument = gql`
    mutation participantSetExponentPushToken($token: String!) {
  participantSetExponentPushToken(token: $token) {
    userId
  }
}
    `;
export const ParticipantUpdateAsParticipantDocument = gql`
    mutation participantUpdateAsParticipant($participant: ParticipantUpdateAsParticipantInput!) {
  participantUpdateAsParticipant(participant: $participant) {
    userId
  }
}
    `;
export const SessionBookMultipleDocument = gql`
    mutation sessionBookMultiple($timeList: [AWSDateTime]) {
  sessionBookMultiple(timeList: $timeList) {
    id
  }
}
    `;
export const SessionBookDocument = gql`
    mutation sessionBook($start: AWSDateTime!, $eventId: ID) {
  sessionBook(start: $start, eventId: $eventId) {
    id
  }
}
    `;
export const SessionDisableDocument = gql`
    mutation sessionDisable($id: ID!) {
  sessionDisable(id: $id) {
    id
  }
}
    `;
export const StatusQuoAddDocument = gql`
    mutation statusQuoAdd($statusQuo: String!) {
  statusQuoAdd(statusQuo: $statusQuo) {
    id
  }
}
    `;
export const StatusQuoUpdateDocument = gql`
    mutation statusQuoUpdate($id: ID!, $statusQuo: String!) {
  statusQuoUpdate(id: $id, statusQuo: $statusQuo) {
    id
  }
}
    `;
export const TaskCloseAsParticipantDocument = gql`
    mutation taskCloseAsParticipant($id: ID!) {
  taskCloseAsParticipant(id: $id) {
    id
  }
}
    `;
export const TaskOpenAsParticipantDocument = gql`
    mutation taskOpenAsParticipant($id: ID!) {
  taskOpenAsParticipant(id: $id) {
    id
  }
}
    `;
export const UpdateAvatarDocument = gql`
    mutation updateAvatar {
  updateAvatar {
    id
  }
}
    `;
export const NoteAddAsParticipantDocument = gql`
    mutation noteAddAsParticipant($note: String!) {
  noteAddAsParticipant(note: $note) {
    ...NoteContent
  }
}
    ${NoteContentFragmentDoc}`;
export const NoteUpdateAsParticipantDocument = gql`
    mutation noteUpdateAsParticipant($id: ID!, $note: String!) {
  noteUpdateAsParticipant(id: $id, note: $note) {
    id
  }
}
    `;
export const ParticipantDetailsDocument = gql`
    query participantDetails {
  participantGetAsParticipant {
    nodeId
    userId
    possibilities
    statusQuos {
      nodeId
      statusQuo
      createdAt
    }
    traitName
    vision
    user {
      name
      avatar
    }
    trainer {
      user {
        name
        avatar
      }
    }
  }
}
    `;
export const ParticipantSessionStatsDocument = gql`
    query participantSessionStats {
  participantGetAsParticipant {
    nodeId
    sessionStats {
      total
      previous
    }
    trainer {
      user {
        name
      }
    }
  }
}
    `;
export const FocuscheckGetAsParticipantDocument = gql`
    query focuscheckGetAsParticipant($id: ID!) {
  focuscheckGetAsParticipant(id: $id) {
    nodeId
    createdAt
    title
    intentionForMe
    intentionForOthers
    investigation
    successCriteria
  }
}
    `;
export const NoteAsParticipantDocument = gql`
    query noteAsParticipant($id: ID!) {
  noteAsParticipant(id: $id) {
    nodeId
    createdAt
    updatedAt
    sessionId
    note
    privacy
  }
}
    `;
export const SessionBookDataDocument = gql`
    query sessionBookData($start: AWSDateTime, $days: Int) {
  trainerAvailability(start: $start, days: $days) {
    start
  }
}
    `;
export const ParticipantSettingsDocument = gql`
    query participantSettings {
  participantGetAsParticipant {
    nodeId
    createdAt
    user {
      name
      avatar
    }
  }
}
    `;
export const TaskAsParticipantDocument = gql`
    query taskAsParticipant($id: ID!) {
  taskAsParticipant(id: $id) {
    nodeId
    description
    completedAt
  }
}
    `;
export const ParticipantTrainerDocument = gql`
    query participantTrainer {
  participantGetAsParticipant {
    nodeId
    trainer {
      background
      keywords
      user {
        name
        avatar
      }
    }
  }
}
    `;
export const GetSignedUrlDocument = gql`
    query getSignedUrl {
  getSignedUrl {
    formdata
  }
}
    `;
export const SessionGetDocument = gql`
    query sessionGet($id: ID!) {
  sessionGet(id: $id) {
    ...SessionContent
  }
}
    ${SessionContentFragmentDoc}`;
export const SessionsBookScreenDocument = gql`
    query sessionsBookScreen {
  sessionListAsParticipant {
    ...SessionContent
  }
}
    ${SessionContentFragmentDoc}`;
export const SessionsNextDocument = gql`
    query sessionsNext {
  sessionListAsParticipant {
    ...SessionContent
  }
}
    ${SessionContentFragmentDoc}`;
export const SessionsScreenDocument = gql`
    query sessionsScreen {
  sessionListAsParticipant {
    ...SessionContent
  }
  participantGetAsParticipant {
    nodeId
    trainerId
    sessionStats {
      upcoming
      booked
    }
  }
}
    ${SessionContentFragmentDoc}`;
export const TaskListAsParticipantDocument = gql`
    query taskListAsParticipant {
  taskListAsParticipant {
    ...TaskContent
  }
}
    ${TaskContentFragmentDoc}`;
export const ToolsDocument = gql`
    query tools {
  noteListAsParticipant {
    nodeId
    createdAt
    updatedAt
    sessionId
    note
    privacy
  }
  focuscheckListAsParticipant {
    nodeId
    createdAt
    updatedAt
    sessionId
    title
    intentionForMe
    intentionForOthers
    investigation
    successCriteria
  }
  sessionListAsParticipant {
    nodeId
    start
    status
  }
}
    `;