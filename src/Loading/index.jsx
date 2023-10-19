import { v4 as uuid } from 'uuid';
import { loading } from '~/constant';
import classNames from 'classnames/bind';
import style from './Loading.module.scss';
const cx = classNames.bind(style);
const Loading = ({ size }) => {
  return (
    <div id={cx('loading')}>
      {loading.map((item) => (
        <span key={uuid()} style={{ fontSize: `${size}` }}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default Loading;
