import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '~/FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { UserLogin } from '~/components/Global';
import classNames from 'classnames/bind';
import style from './ForgetPassword.module.scss';
import TitlePath from '~/TitlePath';
const cx = classNames.bind(style);
export const ForgetPassword = () => {
  const [isForgetPasswordError, setIsForgetPasswordError] = useState(false);
  const [isForgetPasswordSuccess, setIsForgetPasswordSuccess] = useState(false);
  const { isToggle } = useContext(UserLogin);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const handleSubmitForget = async (data) => {
    const { forgetPassword } = data;
    await sendPasswordResetEmail(auth, forgetPassword)
      .then(function () {
        // email nhap dung
        setIsForgetPasswordError(false);
        setIsForgetPasswordSuccess(true);
      })
      .catch(function (error) {
        // email nhap ko dung
        setIsForgetPasswordError(true);
        setIsForgetPasswordSuccess(false);
      });
  };
  return (
    <div className={cx('container')}>
      <div className={cx('forget')}>
        <TitlePath isToggle={isToggle} to='Quên mật khẩu' />
        <div className={cx('content')}>
          <form onSubmit={handleSubmit(handleSubmitForget)}>
            <label htmlFor=''>Vui lòng nhập Email</label>
            <input
              className={cx({
                isToggle: isToggle ? false : true,
              })}
              type='text'
              {...register('forgetPassword', {
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                },
                required: {
                  value: true,
                  message: 'chưa nhập email',
                },
              })}
              placeholder='Nhập email'
              autoComplete='off'
              spellCheck='true'
            />

            <button className={cx('btn-submit')} type='submit'>
              Xác nhận
            </button>
          </form>
          {isForgetPasswordError ? <div className={cx('Notification-error')}>không tìm thấy tài khoản</div> : <></>}
          {isForgetPasswordSuccess && <div className={cx('Notification-success')}>vui lòng kiểm tra email của bạn</div>}
          {!!errors.forgetPassword?.message && (
            <p className={cx('show-error')}>
              <span>{errors.forgetPassword?.message}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
