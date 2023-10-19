import classNames from 'classnames/bind';
import style from './PostTitle.module.scss';
const cx = classNames.bind(style);
const PostTitle = ({ content }) => {
  return <h4 className={cx('wrapper')}>{content}</h4>;
};
export default PostTitle;
