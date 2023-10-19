import classNames from 'classnames/bind';
import style from './Select.module.scss';
import { memo } from 'react';
const cx = classNames.bind(style);
const Select = ({ value, onChange, content, label, defaultValue }) => {
  return (
    <div className={cx('group')}>
      <span>{label}</span>
      <select value={value} onChange={onChange} defaultValue={defaultValue}>
        <option value={content?.first}>{content?.first}</option>
        <option value={content?.mid}>{content?.mid}</option>
        <option value={content?.last}>{content?.last}</option>
      </select>
    </div>
  );
};
export default memo(Select);
