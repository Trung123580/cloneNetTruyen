import { memo } from 'react';
import classNames from 'classnames/bind';
import style from './CardStory.module.scss';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const cx = classNames.bind(style);
const CardStory = ({ data, isToggle, onNavigateDetails, onChapterReading, onDeleteFollow }) => {
  return (
    <div className={cx('list-story')}>
      <div className={cx('avatar')} onClick={onNavigateDetails}>
        <img src={data.thumbnail} alt='' />
      </div>
      <div className={cx('name-story')}>
        <span
          onClick={onNavigateDetails}
          className={cx({
            isToggle: isToggle ? false : true,
          })}>
          {data.title}
        </span>
        <span onClick={onDeleteFollow}>
          <CloseRoundedIcon /> Bỏ theo dõi
        </span>
      </div>
      <div
        onClick={onChapterReading}
        className={cx('history', {
          isToggle: isToggle ? false : true,
        })}>
        {data.chapters[0].name}
      </div>
      <div
        onClick={onChapterReading}
        className={cx('new-chapter', {
          isToggle: isToggle ? false : true,
        })}>
        {data.chapters[0].name}
      </div>
    </div>
  );
};

export default memo(CardStory);
