import { useContext, memo } from 'react';
import classNames from 'classnames/bind';
import style from './Logins.module.scss';
import { UserLogin } from '~/components/Global';
import { FbProvider, GgProvider } from '~/FirebaseConfig';
import TitlePath from '~/TitlePath';
import Form from './Form';
const cx = classNames.bind(style);
function Logins() {
  const { handleLogin } = useContext(UserLogin);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className={cx('container')}>
      <div className={cx('heading')}>
        <TitlePath to='Đăng Nhập' />
      </div>
      <div className={cx('content')}>
        <h1 className={cx('title')}>Đăng Nhập</h1>
        <Form onSubmit={onSubmit} />
        <button onClick={() => handleLogin(FbProvider)}>login fb</button>
        <button onClick={() => handleLogin(GgProvider)}>GG fb</button>
      </div>
    </div>
  );
}
export default memo(Logins);
