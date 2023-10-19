import { memo } from 'react';
import classNames from 'classnames/bind';
import style from './CardTitle.module.scss';
const cx = classNames.bind(style);
const CardTitle = ({ value, style }) => {
  return (
    <>
      <div
        className={cx('table', {
          editStyle: !!style && true,
        })}
        style={{ gridTemplateColumns: value ? '1fr 1fr' : '1.5fr 4.5fr 3fr 3fr' }}>
        {value ? <h3>{value.first}</h3> : <h3>{''}</h3>}
        {value ? <h3>{value.last}</h3> : <h3>Tên truyện</h3>}
        {!value && (
          <>
            <h3>xem gần nhất</h3>
            <h3>chap mới nhất</h3>
          </>
        )}
      </div>
    </>
  );
};

export default memo(CardTitle);
