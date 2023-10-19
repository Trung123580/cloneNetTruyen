import classNames from 'classnames/bind';
import style from './ListTitle.module.scss';
const cx = classNames.bind(style);
export default function ListTitle({ content, icon, isToggle }) {
  return (
    <div
      className={cx('title', {
        isToggle: isToggle ? false : true,
      })}>
      {icon} <span>{content}</span>
    </div>
  );
}
