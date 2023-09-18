import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (_email, _password) => {
    setIsLoading(true);
    try {
      const usersResponse = await axios.get('https://api.escuelajs.co/api/v1/users');
      const users = usersResponse.data;

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

  const handleSignup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/users/', {
        name,
        email,
        password,
        avatar: 'https://i.pinimg.com/236x/c2/9a/7d/c29a7d29348b1a3f502803ab9d8355cc.jpg',
      });
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleSignup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
