import classNames from 'classnames/bind';
import style from './UserChangePassword.module.scss';
import { ModalShow, PostName } from '~/utils/common';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '~/FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
const cx = classNames.bind(style);
const UserChangePassword = ({ userProfile, info, isToggle }) => {
  const [isShowNote, SetIsShowNote] = useState(true);
  const [isForgetPasswordError, setIsForgetPasswordError] = useState(false);
  const [isForgetPasswordSuccess, setIsForgetPasswordSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const handleSubmitForget = async (data) => {
    if (info?.logWith === 'Email') {
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
    } else {
      handleOpenModal();
    }
  };

  return (
    <div className={cx('wrapper')}>
      {isShowNote && (
        <div className={cx('heading')}>
          <ErrorOutlineOutlinedIcon color='error' fontSize='large' />
          <p>Đổi mật khẩu chỉ áp dụng cho tài khoản đăng ký bằng Email</p>
          <CloseIcon color='error' fontSize='large' sx={{ cursor: 'pointer' }} onClick={() => SetIsShowNote(false)} />
        </div>
      )}
      <PostName content='đổi mật khẩu' />
      <div className={cx('content')}>
        <form onSubmit={handleSubmit(handleSubmitForget)}>
          <label htmlFor=''>Vui lòng nhập Email</label>
          <input
            className={cx({
              isToggle: isToggle ? false : true,
            })}
            type='text'
            defaultValue={info?.logWith === 'Email' ? info?.email : ''}
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
        {!!errors.forgetPassword?.message && (
          <p className={cx('show-error')}>
            <span>{errors.forgetPassword?.message}</span>
          </p>
        )}
        {isForgetPasswordError ? <div className={cx('Notification-error')}>không tìm thấy tài khoản</div> : <></>}
        {isForgetPasswordSuccess && <div className={cx('Notification-success')}>vui lòng kiểm tra email của bạn</div>}
        <ModalShow
          onCloseModal={handleCloseModal}
          isToggle={isToggle}
          open={open}
          title='tính năng này chỉ áp dụng cho tài khoản đăng ký bắng Email'
        />
      </div>
    </div>
  );
};
export default UserChangePassword;
