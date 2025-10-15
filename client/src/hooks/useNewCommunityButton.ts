import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseNewCommunityButtonReturn {
  isAuth: boolean;
  buttonText: string;
  buttonDisabled: boolean;
  handleClick: () => void;
}

const useNewCommunityButton = (): UseNewCommunityButtonReturn => {
  const navigate = useNavigate();
  const currentUsername = localStorage.getItem('username');
  const isAuth = !!currentUsername;

  const buttonText = useMemo(() => {
    if (!isAuth) {
      return 'login to create communities';
    }
    return 'create community';
  }, [isAuth]);

  const buttonDisabled = useMemo(() => {
    return !isAuth;
  }, [isAuth]);

  const handleClick = () => {
    if (!isAuth) {
      return;
    }
    navigate('/new/community');
  };

  return {
    isAuth,
    buttonText,
    buttonDisabled,
    handleClick,
  };
};

export default useNewCommunityButton;
