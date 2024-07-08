import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';

import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '~/components/Global';
import { callApiSliderComics } from '~/utils/api';
import Title from '~/Title';
import Loading from '~/Loading';
import { Sliders, Card, Sidebar, Comments } from '~/components';
import style from './Home.module.scss';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PaginationPages from '~/components/PaginationPages';
const cx = classNames.bind(style);
const Home = () => {
  const [product, setProduct] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [page, setPage] = useState(() => {
    const page = JSON.parse(localStorage.getItem('page'));
    if (page) {
      return page;
    } else {
      localStorage.setItem('page', JSON.stringify(1));
      return 1;
    }
  });
  const navigate = useNavigate();
  const { isToggle, info, firebaseUpdateHistory } = useContext(UserLogin);
  useEffect(() => {
    const callApi = async () => {
      const response = await callApiSliderComics();
      setProduct(response);
    };
    callApi();
    localStorage.setItem('page', JSON.stringify(1));
  }, []);
  // console.log(product);
  console.log(newProduct);
  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await axios.get(`https://comics-api.vercel.app/recent-update-comics?page=${page}`);
        setNewProduct(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    callApi();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  const handleChangePage = (e, page) => {
    localStorage.setItem('page', JSON.stringify(page));
    setPage(page);
    setNewProduct(null);
  };
  const handleNavigateDetails = (details) => {
    navigate(`/details?details=${details}`);
  };
  const handleChapterReading = async (e, comicsId, chapterId, userInfo) => {
    e.stopPropagation();
    if (info) await firebaseUpdateHistory(info?.uid, userInfo);
    navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  // console.log(newProduct.comics);
  return (
    <>
      {product && newProduct ? (
        <>
          <div className={cx('container')}>
            <div
              className={cx('home', {
                theme: isToggle ? false : true,
              })}>
              <Title title='Truyện đề cử' />
              <Sliders data={product.length > 0 ? product : []} />
              <div className={cx('main')}>
                <div className={cx('wrapper')}>
                  <div className={cx('heading')}>
                    <Title title='Truyện mới cập nhật' />
                    <div onClick={() => navigate('/search')}>
                      <FilterAltIcon fontSize='large' />
                    </div>
                  </div>
                  <div className={cx('content')}>
                    {newProduct.comics.map((product) => (
                      <Card
                        key={uuid()}
                        data={product}
                        isToggle={isToggle}
                        onNavigateDetails={() => handleNavigateDetails(product.id)}
                        onChapterReading={(e) => handleChapterReading(e, product.id, product.last_chapter.id, product)}
                      />
                    ))}
                  </div>
                  <PaginationPages totalPage={newProduct.total_pages} page={page} onChangePage={handleChangePage} isToggle={isToggle} />
                </div>
                <Sidebar isToggle={isToggle} />
              </div>
            </div>
            <Comments isToggle={isToggle} />
          </div>
        </>
      ) : (
        <>
          <div style={{ height: '100vh' }}></div>
          <Loading />
        </>
      )}
    </>
  );
};
export default Home;
