import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import classNames from 'classnames/bind';
import style from './BackToTop.module.scss';
const cx = classNames.bind(style);
const BackToTop = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div id={cx('back-to-top')} onClick={handleBackToTop}>
      <ArrowBackIosNewIcon fontSize='large' />
    </div>
  );
};
export default BackToTop;
