import { useEffect, useState, useContext } from 'react';
import { Switch, FormControl, Avatar, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { UserLogin } from '../Global';
import { PageUserContext } from '~/PageUserProvider';
import { logo, sun, moon } from '~/assets';
import { FormLogin, FormSearch } from '~/components';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import style from './Header.module.scss';
const cx = classNames.bind(style);
export default function Header() {
  const [isShowNavbar, setIsShowNavBar] = useState(false);
  const [isShowScroll, setIsShowScroll] = useState(false);
  const { navBar } = useContext(UserLogin);
  const { isToggle, setIsToggle } = useContext(UserLogin);
  const { handle } = useContext(PageUserContext);
  const { onRouterComponent } = handle;

  useEffect(() => {
    isShowNavbar ? (navBar.current.style.display = 'block') : (navBar.current.style.display = 'none');
  }, [isShowNavbar, navBar]);
  const handleShowBarMenu = () => {
    setIsShowNavBar(!isShowNavbar);
  };
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 30 ? setIsShowScroll(true) : setIsShowScroll(false);
    };
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);
  return (
    <header
      className={cx('header', {
        Scroll: isShowScroll,
      })}>
      <div className={cx('container')}>
        <div className={cx('header-content')}>
          <div className={cx('header-logo')}>
            <Link to='/'>
              <img src={logo} alt='error' />
            </Link>
          </div>
          <FormSearch />
          <Stack direction='row' alignItems='center' spacing={1}>
            <FormControl>
              <Switch
                className={cx('switch')}
                checked={isToggle}
                onClick={() => setIsToggle(!isToggle)}
                icon={<Avatar className={cx('switch-icon')} sx={{ width: '20px', height: '20px', objectFit: ' cover' }} src={sun} />}
                checkedIcon={<Avatar className={cx('switch-icon')} sx={{ width: '20px', height: '20px', objectFit: ' cover' }} src={moon} />}
              />
            </FormControl>
            <Box>
              <NotificationsActiveIcon fontSize='large' sx={{ cursor: 'pointer', color: '#fff' }} />
            </Box>
          </Stack>
          <FormLogin onRouterComponent={onRouterComponent} />
          <Stack direction='row' className={cx('bar-menu')} onClick={handleShowBarMenu}>
            <div className={cx('icon-search')}>
              <SearchIcon fontSize='large' sx={{ color: '#fff' }} />
            </div>
            <div className={cx('icon-bar')}>
              <span
                className={cx({
                  active: isShowNavbar && true,
                })}></span>
              <span
                className={cx('span2', {
                  active: isShowNavbar && true,
                })}></span>
              <span
                className={cx({
                  active: isShowNavbar && true,
                })}></span>
            </div>
          </Stack>
        </div>
      </div>
    </header>
  );
}
