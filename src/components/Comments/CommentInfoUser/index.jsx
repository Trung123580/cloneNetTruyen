import classNames from 'classnames/bind';
import style from '../ContentComment/ContentComment.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import MenuIcon from '@mui/icons-material/Menu';
const cx = classNames.bind(style);
const CommentInfoUser = ({
  comment,
  isToggle,
  onShowMenuComment,
  idActiveComment,
  isShowMenuComment,
  onCollapseComment,
  onShowEditComment,
  onDeleteComment,
}) => {
  return (
    <div className={cx('wrapper-spaceBestWeen')}>
      <h4 className={cx('user-name')}>
        {comment.name
          ?.split(' ')
          .map((text) => text.substring(0, 1).toUpperCase() + text.substring(1, text.length))
          .join(' ')}
      </h4>
      <div className={cx('menu-action')}>
        <div className={cx('menu-close')} onClick={onShowMenuComment}>
          <Tippy content={<span className={cx('note')}>menu</span>} duration={300}>
            <MenuIcon fontSize='medium' />
          </Tippy>
        </div>
        {comment.uid === idActiveComment && isShowMenuComment && (
          <ul
            className={cx('list-action', {
              isToggle: isToggle ? false : true,
            })}>
            <li onClick={onCollapseComment}>Collapse comment</li>
            <li onClick={onShowEditComment}>Edit comment</li>
            <li onClick={onDeleteComment}>Delete comment</li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default CommentInfoUser;
