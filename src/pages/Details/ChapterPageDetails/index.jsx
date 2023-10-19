import classNames from 'classnames/bind';
import style from '../Details.module.scss';
const cx = classNames.bind(style);
export default function ChapterPageDetails({ id, name, index, isToggle, onChapterReading }) {
  return (
    <li key={id} className={cx('item')} onClick={onChapterReading}>
      <span
        className={cx('chapter', {
          isToggle: isToggle ? false : true,
        })}>
        {name}
      </span>
      <span className={cx('time')}>
        {index >= 360 && index <= 720
          ? '1 năm trước'
          : index > 720 && index < 1080
          ? '2 năm trước'
          : index > 1080
          ? '3 năm trước'
          : `${index + 1} ngày trước`}
      </span>
      <span className={cx('views')}>
        {Math.floor(Math.random() * 10000)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
      </span>
    </li>
  );
}
