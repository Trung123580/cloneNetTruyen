import classNames from 'classnames/bind';
import style from './Input.module.scss';
import { memo } from 'react';
const cx = classNames.bind(style);
const Input = ({ disabled, defaultValue, onChange, title, type, id }) => {
  return (
    <div className={cx('group')}>
      <label>
        <span>{title}</span>
        <input
          id={id}
          type={type || 'text'}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          style={{ cursor: disabled && 'not-allowed' }}
        />
      </label>
    </div>
  );
};
export default memo(Input);
