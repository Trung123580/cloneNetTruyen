import { Pagination, PaginationItem } from '@mui/material';
import classNames from 'classnames/bind';
import style from './Pagination.module.scss';
const cx = classNames.bind(style);
function PaginationPages({ totalPage, page, onChangePage, isToggle }) {
  const style = {
    color: isToggle ? '#999' : '#fff',
    borderColor: isToggle ? '#ddd' : '#4c4c4c',
    background: isToggle ? 'transparent' : '#3a3a3a',
  };
  return (
    <div className={cx('pagination')}>
      <Pagination
        variant='outlined'
        shape='rounded'
        size='large'
        showFirstButton
        showLastButton
        count={totalPage}
        renderItem={(item) => (
          <PaginationItem
            style={style}
            className={cx('item', {
              active: item.page === page && true,
              isToggle: isToggle ? false : true,
            })}
            {...item}
          />
        )}
        page={page}
        onChange={onChangePage}
        siblingCount={3}
        boundaryCount={0}
      />
    </div>
  );
}

export default PaginationPages;
