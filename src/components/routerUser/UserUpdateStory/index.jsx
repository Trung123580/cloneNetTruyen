import classNames from 'classnames/bind';
import style from './UserUpdateStory.module.scss';
import { Button, PostName } from '~/utils/common';
import CardTitle from '../InforMation/CardTitle';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
const cx = classNames.bind(style);
const UserUpdateStory = () => {
  const [isShowNote, SetIsShowNote] = useState(true);
  return (
    <div className={cx('wrapper')}>
      {isShowNote && (
        <div className={cx('heading')}>
          <ErrorOutlineOutlinedIcon color='error' fontSize='large' />
          <p>Bạn chưa có quyền upload truyện. Nếu bạn muốn trở thành Tác giả/Dịch giả để upload truyện, vui lòng đăng ký form bên dưới</p>
          <CloseIcon color='error' fontSize='large' sx={{ cursor: 'pointer' }} onClick={() => SetIsShowNote(false)} />
        </div>
      )}
      <form className={cx('form')}>
        <textarea
          name=''
          id=''
          cols='20'
          rows='4'
          placeholder='Giới thiệu sơ về bản thân hoặc nhóm dịch. Thông tin này rất quan trọng để được kiểm duyệt.'></textarea>
        <Button content='Đăng ký thành Tác giả / Dịch giả' className='warning' />
      </form>
      <div className={cx('user-update')}>
        <PostName content='Truyện đã đăng' />
        <CardTitle />
      </div>
    </div>
  );
};
export default UserUpdateStory;
