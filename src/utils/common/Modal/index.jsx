import { Modal } from '@mui/material';
import classNames from 'classnames/bind';
import style from './Modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { modal } from '~/assets';
const cx = classNames.bind(style);
const ModalShow = ({ open, title, description, onCloseModal, isToggle }) => {
  return (
    <Modal open={open} onClose={onCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <div className={cx('wrapper')}>
        <div className={cx('banner')}>
          <img src={modal} alt='banner' />
        </div>
        <div className={cx('content')}>
          <h3 className={cx('title')}>{title}</h3>
          <p className={cx('desc')}>{description}</p>
          <CloseIcon className={cx('close')} onClick={onCloseModal} />
        </div>
      </div>
    </Modal>
  );
};
export default ModalShow;
