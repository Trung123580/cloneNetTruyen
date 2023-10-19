import classNames from 'classnames/bind';
import style from './PostName.module.scss';
const cx = classNames.bind(style);
const PostName = ({ content }) => {
  return <h2 className={cx('post-name')}>{content}</h2>;
};
export default PostName;
