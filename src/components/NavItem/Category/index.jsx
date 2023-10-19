import style from '../NavItem.module.scss';
import classNames from 'classnames/bind';
import { dataList } from '~/constant';
import { useState } from 'react';
const cx = classNames.bind(style);
function Category({ item, isToggle, onCallApiCategory }) {
  const [showDesc, setShowDesc] = useState('');
  const handleMoveShowDesc = (desc) => {
    setShowDesc(desc);
  };
  const handleMoveDisabled = () => {
    setShowDesc('');
  };
  return (
    <>
      {!!item?.categoryList && (
        <div className={cx('wrapper')} style={{ background: isToggle ? '#fff' : '#000', color: !isToggle && '#fff' }}>
          <ul className={cx('category')}>
            {dataList.map((item) => {
              const { id, name, description, selector } = item;
              return (
                <li
                  key={id}
                  style={{ color: !!selector && '#e74c3c', fontWeight: !!selector && '700' }}
                  className={cx('category-item', {
                    active: id === 'all' && true,
                  })}
                  onMouseMove={() => handleMoveShowDesc(description)}
                  onMouseLeave={() => handleMoveDisabled()}
                  onClick={() => onCallApiCategory(id, description, name)}>
                  {name}
                </li>
              );
            })}
          </ul>
          <div className={cx('description')}>{showDesc}</div>
        </div>
      )}
    </>
  );
}

export default Category;
