import { useEffect, useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames/bind';
import { UserLogin } from '~/components/Global';
import { useNavigate } from 'react-router-dom';
import { callApiGenres } from '~/utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { callApi, descriptionStory, nameGenres } from '~/ReduxToolkit/callApiRedux';
import { Card, Comments } from '~/components';
import { sortsGenres, dataList } from '~/constant';
import Loading from '~/Loading';
import style from './Category.module.scss';
import TitlePath from '~/TitlePath';
import PaginationPages from '~/components/PaginationPages';
import axios from 'axios';
const cx = classNames.bind(style);
const Category = () => {
  const menuGenres = ['Tất cả', 'Hoàn thành', 'Đang tiến hành'];
  const [product, setProduct] = useState(null);
  const [currentApi, setCurrentApi] = useState('');
  const [btnActive, setBtnActive] = useState('');
  const [api, setApi] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [selectChangeGenres, setSelectChangeGenres] = useState('');
  const [selectTop, setSelectTop] = useState('');
  const [page, setPage] = useState(() => {
    const page = JSON.parse(localStorage.getItem('pageGenres'));
    if (page) {
      localStorage.setItem('pageGenres', JSON.stringify(1));
      const page = JSON.parse(localStorage.getItem('pageGenres'));
      return page;
    } else {
      localStorage.setItem('pageGenres', JSON.stringify(1));
      return 1;
    }
  });
  const { response, description, nameStory, apiTop } = useSelector((state) => state.api);
  const { isToggle } = useContext(UserLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setProduct(null); // reloading
    if (response) localStorage.setItem('genres', JSON.stringify(response));
    if (page) localStorage.setItem('pageGenres', JSON.stringify(page));
    const pageGenres = JSON.parse(localStorage.getItem('pageGenres'));
    const genres = JSON.parse(localStorage.getItem('genres'));
    setPage(pageGenres);
    const callApi = async () => {
      const data = await callApiGenres('', genres, pageGenres);
      setProduct(data);
      setCurrentApi('');
      setBtnActive('Tất cả');
      setSelectTop('recent-update-comics');
    };
    callApi();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, response]);
  useEffect(() => {
    if (page) localStorage.setItem('pageGenres', JSON.stringify(page));
    const pageGenres = JSON.parse(localStorage.getItem('pageGenres'));
    setPage(pageGenres);
    if (currentApi) {
      const callApi = async () => {
        const data = await callApiGenres(currentApi, '', pageGenres);
        setProduct(data);
        setSelectTop('recent-update-comics');
      };
      callApi();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      setCurrentApi('');
    };
  }, [currentApi, page]);
  useEffect(() => {
    setApi(apiTop);
    if (api) {
      const callApi = async () => {
        const data = await axios.get(`https://comics-api.vercel.app/${api}?page=${page}`);
        setProduct(data.data);
      };
      callApi();
    }
  }, [api, page, apiTop]);
  const checkScreenWidth = () => {
    return window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
  };
  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [isMobile]);

  const handleApiNext = (api) => {
    setApi(api);
    setSelectTop(api);
    setProduct(null);
    setPage(1);
  };
  const handleCategory = (idGenres, description, name) => {
    dispatch(callApi(idGenres));
    dispatch(nameGenres(name));
    dispatch(descriptionStory(description));
    setProduct(null);
    navigate(`/category?${idGenres}`);
  };
  const handleActiveBtn = (active, index) => {
    setBtnActive(active);
    if (index === 0) setCurrentApi('recent-update-comics'); //  ==>  truyện tranh tất cả
    if (index === 1) setCurrentApi('completed-comics'); // => truyện tranh đã hoàn thành full
    if (index === 2) setCurrentApi('new-comics'); //==> truyện tranh đang tiến hành
    setProduct(null);
    setPage(1);
  };
  const handleChangePage = (e, page) => {
    setPage(page);
    setProduct(null);
  };
  const handleNavigateDetails = (details) => {
    navigate(`/details?details=${details}`);
  };
  const handleChapterReading = (e, comicsId, chapterId) => {
    e.stopPropagation();
    navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  const handleChangeGenres = (e) => {
    const parsedData = JSON.parse(e.currentTarget.value);
    setSelectChangeGenres(e.target.value);
    dispatch(callApi(parsedData.id));
    dispatch(nameGenres(parsedData.name));
    dispatch(descriptionStory(parsedData.desc));
    setProduct(null);
    navigate(`/category?${parsedData.id}`);
  };
  const handleGenresStory = (e) => {
    const api = e.currentTarget.value;
    setApi(api);
    setSelectTop(api);
    setProduct(null);
    setPage(1);
  };
  return (
    <div>
      {product ? (
        <>
          <div className={cx('container')}>
            <div
              className={cx('category', {
                theme: isToggle ? false : true,
              })}>
              <TitlePath to='Thể loại' isToggle={isToggle} chapter={response === 'all' ? '' : nameStory} />
              <div className={cx('content')}>
                <div className={cx('menu')}>
                  <div className={cx('title')}>
                    <h2>
                      {response === 'all' ? 'Tìm truyện tranh' : `Truyện thể loại`}{' '}
                      {response === 'all' ? '' : <span className={cx('genres-active')}>{nameStory}</span>}{' '}
                    </h2>
                    {isMobile ? (
                      <select value={selectChangeGenres} onChange={handleChangeGenres} className={cx('select-genres')}>
                        {dataList.map((item) => (
                          <option key={item.id} value={JSON.stringify({ id: item.id, name: item.name, desc: item.description })}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>

                  <div className={cx('wrapper')}>
                    <span>{description ? description : 'Tất cả thể loại truyện tranh'}</span>
                  </div>
                  <div className={cx('genres-status')}>
                    {menuGenres.map((btn, index) => {
                      return (
                        <button
                          key={uuid()}
                          className={cx('btn', {
                            active: btnActive === btn,
                          })}
                          onClick={() => handleActiveBtn(btn, index)}>
                          {btn}
                        </button>
                      );
                    })}
                  </div>
                  <div className={cx('sort-genres')}>
                    <div className={cx('title')}>Sắp xếp theo:</div>
                    {isMobile ? (
                      <select onChange={handleGenresStory} className={cx('select-genres')}>
                        {sortsGenres.map(({ name, api }) => {
                          return <option value={api}>{name}</option>;
                        })}
                      </select>
                    ) : (
                      <ul className={cx('menu')}>
                        {sortsGenres.map((story) => (
                          <li
                            key={uuid()}
                            className={cx('story-item', {
                              active: story.api === selectTop || story.api === apiTop,
                            })}
                            onClick={() => handleApiNext(story.api)}>
                            {story.icon} {story.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={cx('listCard')}>
                    {product.comics.map((story) => {
                      return (
                        <Card
                          data={story}
                          key={story.id}
                          onNavigateDetails={() => handleNavigateDetails(story.id)}
                          onChapterReading={(e) => handleChapterReading(e, story.id, story.last_chapter.id || story?.chapters[0].id)}
                          isToggle={isToggle}
                        />
                      );
                    })}
                  </div>
                </div>
                {!isMobile && (
                  <div className={cx('sidebar')}>
                    <h2
                      className={cx({
                        isToggle: isToggle ? false : true,
                      })}>
                      Thể loại
                    </h2>
                    <h3>Tất cả thể loại</h3>
                    <ul className={cx('list')}>
                      {dataList.map((item) => (
                        <li
                          key={uuid()}
                          className={cx('item', {
                            active: response === item.id,
                          })}
                          onClick={() => handleCategory(item.id, item.description, item.name)}>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <PaginationPages isToggle={isToggle} totalPage={product.total_pages} page={page} onChangePage={handleChangePage} />
            <Comments isToggle={isToggle} />
          </div>
        </>
      ) : (
        <>
          <div style={{ height: '100vh' }}></div>
          <Loading />
        </>
      )}
    </div>
  );
};
export default Category;
