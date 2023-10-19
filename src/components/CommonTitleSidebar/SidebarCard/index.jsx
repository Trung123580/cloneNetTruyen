import { memo } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import style from './SidebarCard.module.scss';
import { followCursor } from 'tippy.js';
import CloseIcon from '@mui/icons-material/Close';
const cx = classNames.bind(style);
function SidebarCard({ data, index, isToggle, onChapterReading, onNavigateDetails, onDeleteDocsUser }) {
  return (
    <>
      <div className={cx('item')} onClick={onNavigateDetails}>
        <div className={cx('avatar')}>
          <img src={data?.thumbnail} alt='thumbnail' />
        </div>
        <div className={cx('content')}>
          <Tippy
            content={<span style={{}}>{data?.title}</span>}
            followCursor='horizontal'
            plugins={[followCursor]}
            placement='top'
            arrow={false}
            duration={300}>
            <h3
              className={cx('title', {
                isToggle: isToggle ? false : true,
              })}>
              {data?.title}
            </h3>
          </Tippy>
          <div className={cx('chapter')} onClick={onChapterReading}>
            <span
              className={cx({
                isToggle: isToggle ? false : true,
              })}>
              {data?.last_chapter?.name || data?.chapters[0]?.name}
            </span>
            <span
              onClick={onDeleteDocsUser}
              className={cx({
                isToggle: isToggle ? false : true,
              })}>
              <CloseIcon />
              Xóa
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(SidebarCard);
