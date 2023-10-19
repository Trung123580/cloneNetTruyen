import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import style from './Form.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
const cx = classNames.bind(style);
function Form({ onSubmit, nameUser, reset, onNavigateRegister, onNavigateForgetPassword, isToggle, btn }) {
  // dang ky dang nhap xac thuc bang email
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [isShowPassWord, setIsShowPassWord] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cx('form', {
        theme: isToggle ? false : true,
      })}>
      {!!nameUser && (
        <div className={cx('form-control')}>
          <label htmlFor='name'>Tên đăng ký</label>
          <input
            type='text'
            id='name'
            {...register('name', {
              required: {
                value: true,
                message: 'Chưa nhập tên người dùng',
              },
            })}
            placeholder='Nhập tên người dùng'
            autoComplete='off'
          />
          {!!errors.name?.message && (
            <p className={cx('show-error')}>
              <span>{errors.name?.message}</span>
            </p>
          )}
        </div>
      )}
      <div className={cx('form-control')}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          id='email'
          {...register('email', {
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
        />
        {!!errors.email?.message && (
          <p className={cx('show-error')}>
            <span>{errors.email?.message}</span>
          </p>
        )}
      </div>
      <div className={cx('form-control')}>
        <label htmlFor='password'>Password</label>
        <input
          type={isShowPassWord ? 'text' : 'password'}
          id='password'
          {...register('password', {
            required: {
              value: true,
              message: 'Chưa nhập password',
            },
          })}
          placeholder='Nhập password'
          autoComplete='off'
        />
        <div className={cx('toggle-password')} onClick={() => setIsShowPassWord(!isShowPassWord)}>
          {isShowPassWord ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
        {!!errors.password?.message && (
          <p className={cx('show-error')}>
            <span>{errors.password?.message}</span>
          </p>
        )}
      </div>
      {!!reset && (
        <div className={cx('forget')}>
          <span onClick={onNavigateForgetPassword}>quên mật khẩu</span>
          <span onClick={onNavigateRegister}>đăng ký mới</span>
        </div>
      )}
      <button type='submit' className={cx('btn-submit')}>
        {btn ? 'Đăng Ký' : 'Đăng Nhập'}
      </button>
    </form>
  );
}

export default Form;
