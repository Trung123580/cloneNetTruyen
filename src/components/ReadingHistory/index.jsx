import classNames from 'classnames/bind';
import style from './ReadingHistory.module.scss';
const cx = classNames.bind(style);
function ReadingHistory() {
  return (
    <div className={cx('history')}>
      <div className={cx('title')}>
        <h3>lich su doc truyen</h3>
        <span>Xem tất cả</span>
      </div>
      <div className={cx('content')}>
        <div className={cx('story')}></div>
        list history
      </div>
    </div>
  );
}

export default ReadingHistory;
