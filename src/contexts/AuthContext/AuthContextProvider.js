import React, { createContext, useMemo } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const memoizedValue = useMemo(() => ({}), []);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
