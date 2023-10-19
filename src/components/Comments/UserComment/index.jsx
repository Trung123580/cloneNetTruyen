import { memo, useContext } from 'react';
import classNames from 'classnames/bind';
import { UserLogin } from '~/components/Global/Login';
import { Button } from '~/utils/common';
import style from './UserComment.module.scss';
const cx = classNames.bind(style);

const UserComment = ({ onChange, isHideFrom, onClick, valueEditComment }) => {
  const style = { whiteSpace: 'normal', borderRadius: '2px', padding: '0 4px', lineHeight: '22px' };
  const { refTextAria } = useContext(UserLogin);
  return (
    <div className={cx('enter-input')}>
      <textarea
        ref={refTextAria}
        defaultValue={valueEditComment}
        spellCheck='false'
        type='text'
        name='comments'
        placeholder='Add a comment...'
        onChange={onChange}
      />
      <div className={cx('wrapper-btn')}>
        {isHideFrom && <Button content='Cancel' type='button' onClick={onClick} style={style} />}
        <Button type='submit' content='Post' className='btn-fb' style={style} />
      </div>
    </div>
  );
};

export default memo(UserComment);
