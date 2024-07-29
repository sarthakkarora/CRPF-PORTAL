import { useSelector } from 'react-redux';

const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  const isAuthenticated = !!auth.user;
  const user = auth.user;

  return {
    isAuthenticated,
    user,
  };
};

export default useAuth;
