import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import SearchResult from './SearchResult';
import style from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
const cx = classNames.bind(style);
function FormSearch({ className }) {
  const [inputSearch, setInputSearch] = useState('');
  const [showResult, setShowResult] = useState(true);
  const [searchValue, setSearchValue] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timeoutApi = setTimeout(() => {
      if (inputSearch) {
        const getApiSearch = async () => {
          const response = await axios.get(`https://comics-api.vercel.app/search?q=${inputSearch}`);
          setSearchValue([...response?.data?.comics]);
          setReload(false);
        };
        getApiSearch();
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutApi);
    };
  }, [inputSearch]);
  const handleSearchValue = (e) => {
    setInputSearch(e.target.value);
    setReload(true);
    if (!e.target.value) {
      setReload(false);
      setSearchValue([]);
    }
  };
  const handleNavigateDetails = (idDetails) => {
    navigate(`/details?details=${idDetails}`);
  };
  return (
    <div className={cx('search')}>
      <HeadlessTippy
        interactive
        placement='top-start'
        visible={showResult && searchValue.length > 0}
        onClickOutside={() => setShowResult(false)}
        render={(attrs) => {
          return (
            <div className={cx('search-result')} tabIndex={-1} {...attrs}>
              {searchValue.map((search) => {
                return <SearchResult data={search} onNavigateDetails={() => handleNavigateDetails(search?.id)} />;
              })}
            </div>
          );
        }}>
        <div
          className={cx('form-search', {
            'form-search-mobile': className ? true : false,
          })}>
          <input
            value={inputSearch}
            onChange={handleSearchValue}
            onFocus={() => setShowResult(true)}
            type='text'
            id='search'
            name='search'
            placeholder='Tìm Truyện ...'
            autoComplete='off'
          />
          <label htmlFor='search'>
            {reload ? <LoopOutlinedIcon fontSize='large' className={cx('reload')} /> : <SearchIcon fontSize='large' sx={{ color: '#000' }} />}
          </label>
        </div>
      </HeadlessTippy>
    </div>
  );
}
export default FormSearch;
