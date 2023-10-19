import { useContext } from 'react';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
import { UserLogin } from '~/components/Global';
import { Form, ModalShow } from '~/utils/common';
import TitlePath from '~/TitlePath';
const cx = classNames.bind(style);
function Register() {
  const { onSubmitRegister, isToggle, handleCloseModal, open } = useContext(UserLogin);

  return (
    <div className={cx('container')}>
      <div
        className={cx('register', {
          theme: isToggle ? false : true,
        })}>
        <TitlePath to='Đăng ký' isToggle={isToggle} />
        <div className={cx('wrapper')}>
          <div className={cx('content')}>
            <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
            <Form onSubmit={onSubmitRegister} nameUser={true} isToggle={isToggle} btn={true} />
          </div>
        </div>
      </div>
      <ModalShow onCloseModal={handleCloseModal} open={open} isToggle={isToggle} title='Email đã được sử dụng' />
    </div>
  );
}
export default Register;
