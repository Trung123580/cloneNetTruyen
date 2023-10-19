import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { UserLogin } from '../Global';
import { FormLogin, FormSearch, NavItem } from '~/components';
import { navList } from '~/router';
import style from './Nav.module.scss';
const cx = classNames.bind(style);
function Nav() {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { navBar, isToggle } = useContext(UserLogin);
  const location = useLocation(); // lấy đến dường dẫn path đang hiện thị ở view
  useEffect(() => {
    // component dang duoc render theo path
    setIsActive(location.pathname);
  }, [location.pathname]);

  // Chạy sau khi component đã được mount
  const checkScreenWidth = () => {
    return window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [isMobile]);

  return (
    <nav
      ref={navBar}
      className={cx('nav', {
        theme: isToggle ? false : true,
      })}>
      <div className={cx('container')} style={{ padding: isMobile ? '0px' : '0px 15px' }}>
        <div className={cx('nav-menu')}>
          <FormSearch className='from-search-mobile' />
          {!!navList && <NavItem navList={navList} isMobile={isMobile} isActive={isActive} isToggle={isToggle} />}
          <FormLogin className='from-login-mobile' />
        </div>
      </div>
    </nav>
  );
}
export default Nav;
