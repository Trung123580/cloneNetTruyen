import classNames from 'classnames/bind';
import { error } from '~/assets';
import style from './CardDetail.module.scss';
const cx = classNames.bind(style);
const CardDetail = ({ data, isToggle }) => {
  const { title, thumbnail, description, auth, status, totalViews, followers, updateTime } = data;
  return (
    <div
      className={cx('detail', {
        isToggle: isToggle ? false : true,
      })}>
      <h3 className={cx('title')}>{title}</h3>
      <div className={cx('content')}>
        <div className={cx('image')}>
          <img src={thumbnail || error} alt='' />
        </div>
        <div
          className={cx('text', {
            isToggle: isToggle ? false : true,
          })}>
          <p>
            Tên khác : <span>{title}</span>
          </p>
          <p>
            Tác giả : <span>{auth}</span>
          </p>
          <p>
            Tình trạng : <span>{!!status && 'Đang tiến hành'}</span>
          </p>
          <p>
            Lượt xem : <span>{totalViews}</span>
          </p>
          <p>
            Theo dõi : <span>{followers}</span>
          </p>
          <p>
            Ngày cập nhập : <span>{updateTime}</span>
          </p>
        </div>
      </div>
      <p
        className={cx('description', {
          isToggle: isToggle ? false : true,
        })}>
        {description}
      </p>
    </div>
  );
};

export default CardDetail;
