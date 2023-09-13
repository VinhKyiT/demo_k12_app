import { AuthContext } from '~contexts/AuthContext/AuthContextProvider';
import { useContext } from 'react';

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
