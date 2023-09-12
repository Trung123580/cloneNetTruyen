import { memo, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import { UserLogin } from '~/components/Global';
import { signOut } from 'firebase/auth';
import { auth } from '~/FirebaseConfig';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { userImg } from '~/assets';
import classNames from 'classnames/bind';
import style from './Form.module.scss';
const cx = classNames.bind(style);
function FormLogin({ className }) {
  const navigate = useNavigate();
  const { info, setInfo } = useContext(UserLogin);
  const { name, imgUrl } = info ? info : { name: null, imgUrl: null };
  // eslint-disable-next-line
  useEffect(() => {
    if (info) navigate('/');
  }, [info]);
  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem('user');
    setInfo('');
  };
  return (
    <>
      {info ? (
        <div
          className={cx('user', {
            'from-login-mobile': className ? true : false,
          })}>
          <div className={cx('user-info')}>
            <img src={imgUrl ? imgUrl : userImg} alt='' />
            <span>
              {name} <ArrowDropDownIcon fontSize='large' />
            </span>
          </div>
          <ul className={cx('user-menu')}>
            <li>
              <AccountCircleIcon />
              <span>Trang cá nhân</span>
            </li>
            <li>
              <BookmarkIcon />
              <span>Truyện theo dõi</span>
            </li>
            <li onClick={handleSignOut}>
              <LogoutIcon sx={{ position: 'relative', left: '1.5px' }} />
              <span>Thoát</span>
            </li>
          </ul>
        </div>
      ) : (
        // css lai thay tat ca cac the cua thu vien di
        <div
          className={cx('login', {
            'from-login-mobile': className ? true : false,
          })}>
          <Link variant='h6' underline='hover' onClick={() => navigate('/logins')}>
            Đăng Nhập
          </Link>
          <Typography color='#fff' variant='h5'>
            /
          </Typography>
          <Link variant='h6' underline='hover' onClick={() => navigate('/register')}>
            Đăng Ký
          </Link>
        </div>
      )}
    </>
  );
}
export default memo(FormLogin);
