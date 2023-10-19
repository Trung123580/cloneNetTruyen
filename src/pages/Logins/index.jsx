import { useContext, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { UserLogin } from '~/components/Global';
import { FbProvider, GgProvider } from '~/FirebaseConfig';
import { Form, Button } from '~/utils/common';
import TitlePath from '~/TitlePath';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import style from './Logins.module.scss';
const cx = classNames.bind(style);
function Logins() {
  const navigate = useNavigate();
  const { handleLogin, onSubmitLogin, isToggle } = useContext(UserLogin);
  const handleNavigateRegister = () => {
    navigate('/register');
  };
  const handleNavigateForgetPassWord = () => {
    navigate('/forgetPassword');
  };
  return (
    <div className={cx('container')}>
      <div
        className={cx('logins', {
          theme: isToggle ? false : true,
        })}>
        <TitlePath to='Đăng Nhập' isToggle={isToggle} />
        <div className={cx('form-logins')}>
          <div className={cx('content')}>
            <h1 className={cx('title')}>Đăng Nhập</h1>
            <Form
              onSubmit={onSubmitLogin}
              reset={true}
              onNavigateRegister={handleNavigateRegister}
              onNavigateForgetPassword={handleNavigateForgetPassWord}
              isToggle={isToggle}
            />
            <Button
              icon={<FacebookIcon fontSize='large' />}
              content='đăng nhập Facebook'
              className='btn-fb'
              onClick={() => handleLogin(FbProvider)}
              style={{ padding: '10px 12px', justifyContent: 'center' }}
            />
            <Button
              icon={<GoogleIcon fontSize='large' />}
              content='đăng nhập Google'
              className='btn-gg'
              onClick={() => handleLogin(GgProvider)}
              style={{ padding: '10px 12px', justifyContent: 'center' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(Logins);
