import { useContext, useEffect } from 'react';
import { UserLogin } from '~/components/Global';
import { PageUserContext } from '~/PageUserProvider';
import { useNavigate } from 'react-router-dom';
import { auth } from '~/FirebaseConfig';
import { signOut } from 'firebase/auth';
const UserSignOut = () => {
  const { setInfo, setIsInfo, isInfo } = useContext(UserLogin);
  const { handle } = useContext(PageUserContext);
  const { onRouterDefault } = handle;
  const navigate = useNavigate();
  useEffect(() => {
    if (isInfo) {
      navigate('/');
      setIsInfo(false);
      onRouterDefault();
    }
    const handleSignOut = async () => {
      await signOut(auth);
      localStorage.removeItem('user');
      setIsInfo(true);
      setInfo('');
    };
    handleSignOut();
  }, [isInfo]);

  return <div>UserSignOut</div>;
};
export default UserSignOut;
