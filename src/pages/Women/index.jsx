import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Women.module.scss';
import { callApiSliderComics, callApiGirlComics } from '~/utils/api';
import { UserLogin } from '~/components/Global';
import TitlePath from '~/TitlePath';
import Title from '~/Title';
import { Sliders, Card, Ranks, Comments } from '~/components';
import PaginationPages from '~/components/PaginationPages';
import Loading from '~/Loading';
const cx = classNames.bind(style);
export default function Women() {
  const [sliderProduct, setSliderProduct] = useState(null);
  const [trendingProduct, setTrendingProduct] = useState(null);
  const [trendingPage, setTrendingPage] = useState(() => {
    const page = JSON.parse(localStorage.getItem('pageGirlComics'));
    if (page) {
      return page;
    } else {
      localStorage.setItem('pageGirlComics', JSON.stringify(1));
    }
    return 1;
  });
  const { isToggle, info, firebaseUpdateHistory } = useContext(UserLogin);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const getComicsSlider = async () => {
      const response = await callApiSliderComics();
      setSliderProduct(response);
    };
    getComicsSlider();
    localStorage.setItem('pageGirlComics', JSON.stringify(1));
  }, []);
  useEffect(() => {
    const getTrendingApi = async () => {
      const response = await callApiGirlComics(trendingPage);
      setTrendingProduct(response);
    };
    getTrendingApi();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [trendingPage]);
  const handleChangePage = (e, page) => {
    localStorage.setItem('pageGirlComics', JSON.stringify(page));
    setTrendingPage(page);
    setTrendingProduct(null);
  };
  console.log(trendingProduct);
  const handleNavigateDetails = (details) => {
    navigate(`/details?details=${details}`);
  };
  const handleChapterReading = async (e, comicsId, chapterId, userInfo) => {
    e.stopPropagation();
    if (info) await firebaseUpdateHistory(info?.uid, userInfo);
    navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  return (
    <>
      {sliderProduct && trendingProduct ? (
        <>
          <div className={cx('container')}>
            <div
              className={cx('page-hot', {
                theme: isToggle ? false : true,
              })}>
              <TitlePath to={location.pathname.substring(1, location.pathname.length)} isToggle={isToggle} />
              <div className={cx('heading')}>
                <Title title='Truyện đề cử' />
                <Sliders data={sliderProduct} />
              </div>
              <div className={cx('main')}>
                <div className={cx('wrapper')}>
                  <Title title='Truyện con gái' />
                  <div className={cx('content')}>
                    {trendingProduct.comics.map((product) => (
                      <Card
                        key={product.id}
                        data={product}
                        isToggle={isToggle}
                        onNavigateDetails={() => handleNavigateDetails(product.id)}
                        onChapterReading={(e) => handleChapterReading(e, product.id, product.last_chapter.id, product)}
                      />
                    ))}
                  </div>
                  <PaginationPages totalPage={trendingProduct.total_pages} page={trendingPage} onChangePage={handleChangePage} isToggle={isToggle} />
                </div>
                <Ranks isToggle={isToggle} />
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
}
