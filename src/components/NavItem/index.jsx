import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './NavItem.module.scss';
import Category from './Category';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const cx = classNames.bind(style);
function NavItem({ navList, category, isMobile, isActive, isToggle }) {
  console.log(category);
  return (
    <ul className={cx('nav-list')}>
      {navList.map((item, index, arr) => {
        arr[0].isMobile = isMobile;
        return (
          <li key={index} className={cx('nav-item')}>
            <Link
              className={cx({
                active: isActive === item.path ? true : false,
              })}
              to={item.path}
              style={{
                color: isToggle ? '#333' : '#fff',
                backgroundColor: isToggle ? null : 'transparent',
              }}>
              {arr[0].isMobile ? item.name : arr[0].name === item.name ? item.icon : item.name}
              {index > 0 && item.icon ? item.icon : <></>}
              {!!item?.block && (
                <div>
                  <span>
                    <ArrowDropUpIcon fontSize='large' />
                  </span>
                  <span>
                    <ArrowDropDownIcon fontSize='large' />
                  </span>
                </div>
              )}
            </Link>
            <Category category={category} item={item} />
            {!!item?.ulList && <ul className={cx('rank')}>asdads</ul>}
          </li>
        );
      })}
    </ul>
  );
}

export default memo(NavItem);
