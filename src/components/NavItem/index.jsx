import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames/bind';
import { callApi } from '~/ReduxToolkit/callApiRedux';
import Category from './Category';
import RankItem from './RankItem';
import style from './NavItem.module.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const cx = classNames.bind(style);
function NavItem({ navList, isMobile, isActive, isToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCallApiCategory = (idGenres) => {
    dispatch(callApi(idGenres));
    navigate(`/category?${idGenres}`);
  };
  const handleCallApiRank = (idRank) => {
    dispatch(callApi(idRank));
    navigate(`/category?${idRank}`);
  };
  return (
    <ul className={cx('nav-list')}>
      {navList.map((item, index, arr) => {
        arr[0].isMobile = isMobile;
        return (
          <li key={uuid()} className={cx('nav-item')}>
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
            <Category item={item} isToggle={isToggle} onCallApiCategory={handleCallApiCategory} />
            <RankItem item={item} isToggle={isToggle} onCallApiRank={handleCallApiRank} />
          </li>
        );
      })}
    </ul>
  );
}

export default memo(NavItem);
