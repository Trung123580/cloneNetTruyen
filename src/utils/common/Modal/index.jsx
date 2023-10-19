import { Modal } from '@mui/material';
import classNames from 'classnames/bind';
import style from './Modal.module.scss';
const cx = classNames.bind(style);
const ModalShow = ({ open, title, description, onCloseModal, isToggle }) => {
  return (
    <Modal open={open} onClose={onCloseModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <div
        className={cx('wrapper', {
          theme: isToggle ? false : true,
        })}>
        <div className='banner'>
          <img src='' alt='banner' />
        </div>
        <div className='content'>
          <h3 className={cx('title')}>{title}</h3>
          <p className={cx('desc')}>{description}</p>
          <button>Close</button>
        </div>
      </div>
    </Modal>
  );
};
export default ModalShow;
