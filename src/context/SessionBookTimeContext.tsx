import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';

import { noop } from '@Utils/types';

interface SessionBookTimeContextType {
  selectedTime: string;
  preselectedTimes: string[];
  setSelectedTime: Dispatch<SetStateAction<string>>;
  setPreselectedTimes: Dispatch<SetStateAction<string[]>>;
  isOnboarding: boolean;
  setIsOnboarding: Dispatch<SetStateAction<boolean>>;
}

const SessionBookTimeContext = React.createContext<SessionBookTimeContextType>({
  selectedTime: '',
  preselectedTimes: [],
  setSelectedTime: noop,
  setPreselectedTimes: noop,
  isOnboarding: false,
  setIsOnboarding: noop,
});

export const useSessionBookTime = () => useContext(SessionBookTimeContext);

interface SessionBookTimeProviderProps {
  children: React.ReactNode;
}

export const SessionBookTimeProvider = ({ children }: SessionBookTimeProviderProps) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [preselectedTimes, setPreselectedTimes] = useState<string[]>([]);
  const [isOnboarding, setIsOnboarding] = useState(false);

  const sessionBookTimeContext = useMemo(
    () => ({
      selectedTime,
      setSelectedTime,
      setPreselectedTimes,
      preselectedTimes,
      isOnboarding,
      setIsOnboarding,
    }),
    [preselectedTimes, selectedTime, isOnboarding],
  );

  return <SessionBookTimeContext.Provider value={sessionBookTimeContext}>{children}</SessionBookTimeContext.Provider>;
};
