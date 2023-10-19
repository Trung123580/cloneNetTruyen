import classNames from 'classnames/bind';
import style from './SidebarTitle.module.scss';
const cx = classNames.bind(style);
function SidebarTitle({ isToggle, title, onNav }) {
  return (
    <div className={cx('title')}>
      <h3
        className={cx({
          active: isToggle ? false : true,
        })}>
        {title}
      </h3>
      <span
        className={cx({
          active: isToggle ? false : true,
        })}
        onClick={onNav}>
        Xem tất cả
      </span>
    </div>
  );
}

export default SidebarTitle;
