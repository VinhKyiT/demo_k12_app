import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (_email, _password) => {
    setIsLoading(true);
    try {
      const usersJson = await fetch('https://api.escuelajs.co/api/v1/users');
      const users = await usersJson.json();

      if (Array.isArray(users) && users?.length > 0) {
        const actualUser = users.find(
          item => item.email?.toLowerCase?.() === _email?.toLowerCase?.(),
        );
        if (actualUser) {
          if (actualUser?.password === _password) {
            setIsLoggedIn(true);
            setIsLoading(false);
            return;
          }
        }
      }
      setIsLoggedIn(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
