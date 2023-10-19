import { memo } from 'react';
import classNames from 'classnames/bind';
import style from './SliderItem.module.scss';
import AvTimerIcon from '@mui/icons-material/AvTimer';
const cx = classNames.bind(style);
function SliderItem({ item, onNavigate, isToggle, onNavigateChapter }) {
  const {
    thumbnail,
    title,
    updated_at: updateTime,
    id,
    lastest_chapter: { name: storyName },
  } = item;
  return (
    <div
      key={id}
      className={cx('card-item', {
        border: isToggle ? false : true,
      })}
      onClick={() => onNavigate(id)}>
      <div className={cx('img')}>
        <img src={thumbnail} alt='error' />
      </div>
      <div className={cx('content')}>
        <h3
          className={cx('name', {
            active: isToggle ? false : true,
          })}>
          {title}
        </h3>
        <div
          className={cx('caption', {
            active: isToggle ? false : true,
          })}
          onClick={onNavigateChapter}>
          <span className={cx('chapter')}>{storyName}</span>
          <span className={cx('time')}>
            <AvTimerIcon /> {updateTime}
          </span>
        </div>
      </div>
    </div>
  );
}
export default memo(SliderItem);
