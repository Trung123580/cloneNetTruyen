import { v4 as uuid } from 'uuid';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import style from './Footer.module.scss';
import { useDispatch } from 'react-redux';
import { callApi } from '~/ReduxToolkit/callApiRedux';
import { keyWord } from '~/constant';
import { logo } from '~/assets';
const cx = classNames.bind(style);
const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (genres) => {
    if (genres) {
      dispatch(callApi(genres));
      navigate(`category?${genres}`);
    }
  };
  return (
    <>
      <footer id={cx('footer')}>
        <div className={cx('container')}>
          <div className={cx('main')}>
            <div className={cx('info')}>
              <div className={cx('logo')}>
                <img src={logo} alt='logo' />
              </div>
              <div className={cx('wrapper')}>
                <a href='https://www.facebook.com/profile.php?id=100030925532732'>Liên hệ bản quyền</a>
                <a href='https://www.facebook.com/profile.php?id=100030925532732'>Chính sách bảo mật</a>
              </div>
              <p className={cx('copyright')}>Copyright © 2023 NetTruyen</p>
            </div>
            <div className={cx('menu')}>
              <h3>Từ Khóa</h3>
              <ul>
                {keyWord.map((item) => (
                  <li key={uuid()} onClick={() => handleNavigate(item.genres)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
