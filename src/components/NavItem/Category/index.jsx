import { useState } from 'react';
import style from '../NavItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function Category({ category, item }) {
  const [desc, setDesc] = useState('');
  return (
    <>
      {!!item?.categoryList && (
        <ul className={cx('category')}>
          {!!category.length > 0 &&
            category.map((item, index) => {
              const { id, name, description } = item;
              setDesc(description);
              return (
                <li
                  key={id}
                  className={cx('category-item', {
                    active: id === 'all' && true,
                  })}>
                  {name}
                </li>
              );
            })}
          <div className={cx('description')}>{desc}</div>
        </ul>
      )}
    </>
  );
}

export default Category;
