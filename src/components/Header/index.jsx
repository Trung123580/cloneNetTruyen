import { useEffect, useState, useRef, useContext } from 'react';
import classNames from 'classnames/bind';
import { Switch, FormControl, Avatar, Box, Stack } from '@mui/material';
import { FormLogin, FormSearch } from '~/components';
import { UserLogin } from '../Global';
import { logo, sun, moon } from '~/assets';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import style from './Header.module.scss';
const cx = classNames.bind(style);
export default function Header() {
  // const [isToggle, setIsToggle] = useState(true);

  const [isShowNavbar, setIsShowNavBar] = useState(false);
  const { navBar } = useContext(UserLogin);
  const { isToggle, setIsToggle } = useContext(UserLogin);
  const item = useRef();
  const handleShowBarMenu = () => {
    setIsShowNavBar(!isShowNavbar);
  };
  useEffect(() => {
    isShowNavbar ? (navBar.current.style.display = 'block') : (navBar.current.style.display = 'none');
    const listNodes = item.current.childNodes;
    if (isShowNavbar) {
      listNodes[0].style = `position: absolute; background-color: #fff; transform: rotate(45deg);  top: 12.5px; scale: 1.3; border-radius: 1px;`;
      listNodes[1].style = `display: none`;
      listNodes[2].style = ` position: absolute; background-color: #fff; transform: rotate(-45deg);  top: 12.5px; scale: 1.3; border-radius: 1px;`;
    } else {
      listNodes.forEach((item) => {
        item.style = `display: inline-block; scale: 1; height: 4px; background-color: #fff; transition: 1s;`;
      });
    }
  }, [isShowNavbar, navBar]);
  const bodyRef = useRef(document.body);
  useEffect(() => {
    bodyRef.current.style = `background :${isToggle ? '#ebebeb' : '#1a1a1a'} ;color: ${isToggle ? '#333' : '#fff'}`;
  }, [isToggle]);
  return (
    <header className={cx('header')}>
      <div className={cx('container')}>
        <div className={cx('header-content')}>
          <div className={cx('header-logo')}>
            <img src={logo} alt='error' />
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
          <FormLogin />
          <Stack direction='row' className={cx('bar-menu')} onClick={handleShowBarMenu}>
            <div className={cx('icon-search')}>
              <SearchIcon fontSize='large' sx={{ color: '#fff' }} />
            </div>
            <div ref={item} className={cx('icon-bar')}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Stack>
        </div>
      </div>
    </header>
  );
}
