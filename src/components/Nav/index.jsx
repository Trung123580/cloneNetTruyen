import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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
  const [category, setCategory] = useState([]);
  console.log(category);
  const { navBar, isToggle } = useContext(UserLogin);
  const location = useLocation(); // lấy đến dường dẫn path đang hiện thị ở view
  // Chạy sau khi component đã được mount
  const checkScreenWidth = () => {
    return window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
  };
  useEffect(() => {
    // component dang duoc render theo path
    setIsActive(location.pathname);
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [location.pathname, isMobile]);
  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await axios.get(`https://comics-api.vercel.app/genres`);
        setCategory([...response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    callApi();
  }, []);
  return (
    <nav ref={navBar} className={cx('nav')} style={{ background: isToggle ? '#bebebe ' : '#141414' }}>
      <div className={cx('container')} style={{ padding: isMobile ? '0px' : '0px 15px' }}>
        <div className={cx('nav-menu')}>
          <FormSearch className='from-search-mobile' />
          {!!navList && (
            <NavItem navList={navList} category={category.length > 0 ? category : []} isMobile={isMobile} isActive={isActive} isToggle={isToggle} />
          )}
          <FormLogin className='from-login-mobile' />
        </div>
      </div>
    </nav>
  );
}
export default Nav;
