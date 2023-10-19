import classNames from 'classnames/bind';
import style from './UserProfile.module.scss';
import { Button, ModalShow, PostName, PostTitle } from '~/utils/common';
import { error } from '~/assets';
import Input from './Input';
import Select from './Select';
const cx = classNames.bind(style);
const UserProfile = ({ isToggle, handle, selectValue, userProfile, info }) => {
  const { onUploadImage, onSubmitEditUser, onChangeFirstName, onChangeLastName, onChangeSelectSex, onChangeSelectRank, onCloseModal } = handle;
  const { changeSelectSex, changeSelectRank, open } = selectValue;
  console.log(info);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('heading')}>
        <PostName content='thông tin tài khoản' />
        <PostTitle content='Cập nhật thông tin tài khoản' />
      </div>
      <div className={cx('content')}>
        <div className={cx('user-info')}>
          <Input title='Tài khoản' disabled={true} id='first-name' defaultValue={userProfile?.name || info?.name} />
          <Input title='Địa chỉ Email' type='email' id='last-name' disabled={true} defaultValue={userProfile?.email || info?.email} />
          <form className={cx('form')} onSubmit={onSubmitEditUser}>
            <Input title='Tên' defaultValue={userProfile?.firstName || info?.firstName} onChange={onChangeFirstName} />
            <Input title='Họ' defaultValue={userProfile?.lastName || info?.lastName} onChange={onChangeLastName} />
            <Select
              content={{ first: '', mid: 'Nam', last: 'Nữ' }}
              label='Giới tính'
              value={changeSelectSex}
              defaultValue={userProfile?.sex || info?.sex || changeSelectSex}
              onChange={onChangeSelectSex}
            />
            <Select
              content={{ first: 'Bình thường', mid: 'tu tiên', last: 'tinh không' }}
              value={changeSelectRank}
              defaultValue={userProfile?.rank || info?.rank || changeSelectRank}
              onChange={onChangeSelectRank}
              label='Loại cấp bậc'
            />
            <Button type='submit' content='Cập nhật' className='btn-fb' style={{ width: 'max-content' }} />
          </form>
        </div>
        <div className={cx('upload-avatar')}>
          <h4>Avatar</h4>
          <div className={cx('upload')}>
            <div className={cx('img')}>
              <img src={userProfile?.imgUrl || info?.imgUrl || error} alt='error' id='upload-img' />
            </div>
            <label htmlFor='file' className={cx('file')}>
              Upload ảnh
            </label>
            <input type='file' id='file' accept='.png, .jpeg, .gif , .jpg' onChange={onUploadImage} style={{ display: 'none' }} />
          </div>
          <span>{`jpg,jpeg,gif,png <2MB`}</span>
          <span className={cx('note')}>Avatar tục tĩu sẽ bị khóa vĩnh viễn</span>
        </div>
      </div>
      <ModalShow
        isToggle={isToggle}
        open={open}
        onCloseModal={onCloseModal}
        title={'err'}
        description='bạn chưa điền đầy thông tin hay dữ liệu của bạn không thay đổi'
      />
    </div>
  );
};
export default UserProfile;
