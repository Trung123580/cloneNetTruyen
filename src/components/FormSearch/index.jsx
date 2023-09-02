import style from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function FormSearch({ className }) {
  return (
    <div
      className={cx('form-search', {
        'form-search-mobile': className ? true : false,
      })}>
      <input type='text' id='search' placeholder='Tìm Truyện ...' autoComplete='off' />
      <label htmlFor='search'>
        <SearchIcon fontSize='large' sx={{ color: '#000' }} />
      </label>
    </div>
  );
}
export default FormSearch;
