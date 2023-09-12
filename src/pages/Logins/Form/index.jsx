import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import style from './Form.module.scss';
const cx = classNames.bind(style);
function Form({ onSubmit }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cx('form-control')}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          id='email'
          {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'chua nhap email',
            },
          })}
        />
        <p>{errors.email?.message}</p>
      </div>
      <div className={cx('form-control')}>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          {...register('password', {
            required: {
              value: true,
              message: 'chua nhap password',
            },
          })}
        />
        <p>{errors.password?.message}</p>
      </div>
      <button type='submit'>submit</button>
    </form>
  );
}

export default Form;
