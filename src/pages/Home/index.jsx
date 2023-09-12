import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '~/components/Global';
import Title from '~/Title';
import Loading from '~/Loading';
import { Sliders, Card, Sidebar } from '~/components';
import style from './Home.module.scss';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PaginationPages from '~/components/PaginationPages';
const cx = classNames.bind(style);
const Home = () => {
  const [product, setProduct] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  console.log(newProduct);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { isToggle } = useContext(UserLogin);
  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await axios.get(`https://comics-api.vercel.app/recommend-comics`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    callApi();
  }, []);
  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await axios.get(`https://comics-api.vercel.app/new-comics?page=${page}`);
        setNewProduct(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    callApi();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  const handleChangePage = (e, page) => {
    setPage(page);
    setNewProduct(null);
  };
  const handleNavigateDetails = (details) => {
    if (details) navigate(`/details?details=${details}`);
  };
  return (
    <>
      {product && newProduct ? (
        <div className={cx('container')}>
          <div className={cx('home')} style={{ backgroundColor: isToggle ? '#f9f9f9' : '#252525' }}>
            <Title title='Truyện đề cử' />
            {!!product && <Sliders data={product.length > 0 ? product : []} />}
            <div className={cx('main')}>
              <div className={cx('wrapper')}>
                <div className={cx('heading')}>
                  <Title title='Truyện mới cập nhật' />
                  <div>
                    <FilterAltIcon fontSize='large' />
                  </div>
                </div>
                <div className={cx('content')}>
                  {!!newProduct &&
                    newProduct.comics.map((product) => (
                      <Card key={product.id} data={product} isToggle={isToggle} onNavigateDetails={handleNavigateDetails} />
                    ))}
                </div>
                {!!newProduct && (
                  <PaginationPages totalPage={newProduct.total_pages} page={page} onChangePage={handleChangePage} isToggle={isToggle} />
                )}
              </div>
              <Sidebar isToggle={isToggle} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Home;
