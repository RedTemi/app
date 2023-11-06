import React, { useContext, useMemo, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authContext = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
    }),
    [isLoggedIn, setIsLoggedIn],
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
