import classNames from 'classnames/bind';
import style from './Button.module.scss';
const cx = classNames.bind(style);
const Button = ({ icon, onClick, content, className, style, disabled, type }) => {
  // class theo ten: warning , success
  return (
    <button
      style={style}
      className={cx('btn', {
        [className]: className,
      })}
      type={type}
      onClick={onClick}
      disabled={disabled && true}>
      {icon}
      {content}
    </button>
  );
};
export default Button;
