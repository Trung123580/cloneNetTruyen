import classNames from 'classnames/bind';
import style from './Card.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { followCursor } from 'tippy.js';
import CardDetail from './CardDetail';
import { error } from '~/assets';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
const cx = classNames.bind(style);
const Card = ({ data, isToggle, onNavigateDetails, onChapterReading, unFollow, onDeleteFollow }) => {
  const {
    id: auth,
    title,
    thumbnail,
    total_views: totalViews,
    updated_at: updateTime,
    last_chapters: lastChapter,
    last_chapter: lastChapter2,
    short_description: description,
    followers,
    other_names: otherName,
    genres,
    status,
  } = data;
  const dataCardDetail = {
    title,
    otherName,
    thumbnail,
    genres,
    // description: data?.short_description || data?.description,
    description,
    auth,
    status,
    totalViews,
    followers,
    updateTime: updateTime ? updateTime : '1 ngày trước',
  };
  console.log(data);
  console.log(lastChapter);
  return (
    <div className={cx('card')} onClick={onNavigateDetails}>
      <div className={cx('thumbnail')}>
        <img src={thumbnail || error} alt='error' />
        <div className={cx('position')}>
          <span>
            <VisibilityIcon /> {totalViews.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
          </span>
          <span>
            <FavoriteIcon /> {followers.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
          </span>
        </div>
      </div>
      <div className={cx('content')}>
        {!!unFollow && (
          <span className={cx('un-follow')} onClick={onDeleteFollow}>
            <CloseIcon /> {unFollow}
          </span>
        )}
        <Tippy
          content={<CardDetail data={dataCardDetail} isToggle={isToggle} />}
          followCursor='horizontal'
          plugins={[followCursor]}
          placement='bottom-start'
          arrow={false}
          duration={300}>
          <h3
            className={cx('name', {
              hover: isToggle ? false : true,
            })}>
            {title}
          </h3>
        </Tippy>
        <div className={cx('chapter')} onClick={onChapterReading}>
          <span
            className={cx('chapter-item', {
              hover: isToggle ? false : true,
            })}>
            {!!lastChapter?.length && lastChapter[0]?.name}
            {!!data?.chapters?.length && data?.chapters[0]?.name}
            {!!lastChapter2?.length && lastChapter2[0]?.name}
          </span>
          <span className={cx('time')}>{updateTime || '1 ngày trước'}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
