import React, { createContext, useCallback, useMemo, useState } from 'react';
import { ROUTES } from '../../constants/routes';
import LocalStorage from '../../helpers/storage';
import NavigationServices from '../../utils/NavigationServices';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const getIsLoggedInStatus = async () => {
  //   const loginStatus = await LocalStorage.getData('IS_LOGGED_IN');
  //   return !!loginStatus;
  // };

  // useEffect(() => {
  //   getIsLoggedInStatus().then(result => {
  //     if (result) {
  //       NavigationServices.navigate(ROUTES.DRAWER);
  //     }
  //   });
  // }, []);

  const handleLogin = useCallback((email, password) => {
    if (email?.toLowerCase() === 'admin@gmail.com' && password === '123123') {
      NavigationServices.reset({ routes: [{ name: ROUTES.DRAWER }], index: 0 });
      setIsLoggedIn(true);
      LocalStorage.storeData('IS_LOGGED_IN', true);
    }
  }, []);

  const handleLogout = useCallback(() => {}, []);

  const memoizedValue = useMemo(
    () => ({
      isLoggedIn,
      handleLogin,
      handleLogout,
    }),
    [isLoggedIn, handleLogin, handleLogout],
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
