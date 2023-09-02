import { memo } from 'react';
import classNames from 'classnames/bind';
import style from './SliderItem.module.scss';
const cx = classNames.bind(style);
function SliderItem({ item, onNavigate }) {
  const {
    thumbnail,
    title,
    updated_at: updateTime,
    id,
    lastest_chapter: { name: storyName, id: storyId },
  } = item;
  return (
    <div key={id} className={cx('card-item')} onClick={() => onNavigate(id, storyId)}>
      <div className={cx('img')}>
        <img src={thumbnail} alt='error' />
      </div>
      <div className={cx('content')}>
        <h3 className={cx('name')}>{title}</h3>
        <div className={cx('caption')}>
          <span className={cx('chapter')} data-id={storyId}>
            {storyName}
          </span>
          <span className={cx('time')}>{updateTime}</span>
        </div>
      </div>
    </div>
  );
}
export default memo(SliderItem);
