import React, { createContext, useCallback, useState, useMemo } from 'react';
import axios from 'axios';
import { getData, removeData, storeData } from '../../helpers/storage';
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

  const handleLogin = useCallback(async (email, password) => {
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
        setIsLoggedIn(true);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return false;
    }
  }, []);

  const getLoginStatus = useCallback(async () => {
    const hasToken = await getData('TOKEN');
    if (hasToken?.accessToken) {
      return true;
    }
    return false;
  }, []);

  const getUserData = useCallback(async () => {
    try {
      const token = await getData('TOKEN');
      const resUser = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      setUser(resUser?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSignup = useCallback(async (name, email, password) => {
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
  }, []);

  const handleLogout = useCallback(async () => {
    await removeData('TOKEN');
    await removeData('CART_DATA');
    removeAllCart();
    setLogin(false);
  }, [setLogin, removeAllCart]);

  const setLogin = useCallback(isLoggedInValue => {
    setIsLoggedIn(isLoggedInValue);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isLoggedIn,
      handleLogin,
      handleSignup,
      isLoading,
      setLogin,
      handleLogout,
      user,
      getUserData,
      getLoginStatus,
    }),
    [
      getLoginStatus,
      getUserData,
      handleLogin,
      handleLogout,
      handleSignup,
      isLoading,
      isLoggedIn,
      setLogin,
      user,
    ],
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
