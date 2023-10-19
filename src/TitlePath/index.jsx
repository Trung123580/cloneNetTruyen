import classNames from 'classnames/bind';
import style from './TitlePath.module.scss';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
const cx = classNames.bind(style);
function TitlePath({ to, title, isToggle, chapter, readChapter }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={cx('title', {
          isToggle: isToggle ? false : true,
        })}>
        <span onClick={() => navigate('/')}>
          Trang chủ <KeyboardDoubleArrowRightSharpIcon />
        </span>
        {to ? (
          <span className={cx('to')} style={{ textTransform: 'capitalize' }}>
            {to}
          </span>
        ) : (
          <span>Thể Loại</span>
        )}
        {!!title && (
          <span>
            <KeyboardDoubleArrowRightSharpIcon /> {title}
          </span>
        )}
        {!!chapter && (
          <span>
            <KeyboardDoubleArrowRightSharpIcon />
            {chapter}
          </span>
        )}
      </div>
      {!!readChapter && (
        <div className={cx('bottom')}>
          <span>
            <KeyboardDoubleArrowRightSharpIcon />
            {readChapter?.name}
          </span>
          <span>
            <KeyboardDoubleArrowRightSharpIcon />
            {readChapter?.chapter}
          </span>
        </div>
      )}
    </>
  );
}

export default TitlePath;
