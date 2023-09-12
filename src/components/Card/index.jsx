import classNames from 'classnames/bind';
import style from './Card.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { followCursor } from 'tippy.js';
import CardDetail from './CardDetail';
import { error } from '~/assets';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
const cx = classNames.bind(style);
const Card = ({ data, isToggle, onNavigateDetails }) => {
  const {
    id: auth,
    title,
    thumbnail,
    short_description: description,
    total_views: totalViews,
    updated_at: updateTime,
    last_chapter: lastChapter,
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
    description,
    auth,
    status,
    totalViews,
    followers,
    updateTime,
  };
  return (
    <div className={cx('card')} onClick={() => onNavigateDetails(auth)}>
      <div className={cx('thumbnail')}>
        <img src={thumbnail || error} alt='error' />
        <div className={cx('position')}>
          <span>
            <VisibilityIcon /> {totalViews}
          </span>
          <span>
            <FavoriteIcon /> {followers}
          </span>
        </div>
      </div>
      <div className={cx('content')}>
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
        <div className={cx('chapter')}>
          <span
            className={cx('chapter-item', {
              hover: isToggle ? false : true,
            })}>
            {lastChapter.name}
          </span>
          <span className={cx('time')}>{updateTime}</span>
        </div>
        {/* lastChapter.id */}
      </div>
    </div>
  );
};

export default Card;
