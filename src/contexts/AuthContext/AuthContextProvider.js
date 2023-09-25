import React, { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import { removeData, storeData } from '../../helpers/storage';
import useCart from '../../hooks/useCart';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { removeAllCart } = useCart();
  // const handleLogin = async (_email, _password) => {
  //   setIsLoading(true);
  //   try {
  //     const usersResponse = await axios.get('https://api.escuelajs.co/api/v1/users');
  //     const users = usersResponse.data;

  //     if (Array.isArray(users) && users?.length > 0) {
  //       const actualUser = users.find(
  //         item => item.email?.toLowerCase?.() === _email?.toLowerCase?.(),
  //       );
  //       if (actualUser) {
  //         if (actualUser?.password === _password) {
  //           setIsLoggedIn(true);
  //           setIsLoading(false);
  //           return;
  //         }
  //       }
  //     }
  //     setIsLoggedIn(false);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const loginResult = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email,
        password,
      });
      if (loginResult?.data?.access_token) {
        await storeData('TOKEN', {
          accessToken: loginResult?.data?.access_token,
          refreshToken: loginResult?.data?.refresh_token,
        });
        try {
          const resUser = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
              Authorization: `Bearer ${loginResult?.data?.access_token}`,
            },
          });
          setUser(resUser?.data);
        } catch (error) {
          console.log(error);
        }
        setIsLoggedIn(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
      if (response?.data) {
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  const handleLogout = useCallback(async () => {
    await removeData('TOKEN');
    await removeData('CART_DATA');
    removeAllCart();
    setLogin(false);
  }, [setLogin, removeAllCart]);

  const setLogin = useCallback(isLoggedInValue => {
    setIsLoggedIn(isLoggedInValue);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, handleLogin, handleSignup, isLoading, setLogin, handleLogout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
