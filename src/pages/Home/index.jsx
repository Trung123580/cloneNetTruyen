import { useEffect, useState, useContext } from 'react';
import { UserLogin } from '~/components/Global';
// import axios from 'axios';
import { callApiHome } from '~/utils/api/apiHome';
import classNames from 'classnames/bind';
import Title from '~/Title';
import { Sliders } from '~/components';
import style from './Home.module.scss';
const cx = classNames.bind(style);
const Home = () => {
  const [product, setProduct] = useState(null);
  console.log(product);
  const { isToggle } = useContext(UserLogin);
  useEffect(() => {
    // const callApi = async () => {
    //   try {
    //     const response = await axios.get(`https://comics-api.vercel.app/recommend-comics`);
    //     setProduct(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // callApi();
    const callApi = async () => {
      const response = await callApiHome();
      setProduct(response);
    };
    callApi();
  }, []);
  return (
    <div className={cx('container')}>
      <div className={cx('home')} style={{ backgroundColor: isToggle ? '#f9f9f9' : '#252525' }}>
        <Title title='Truyện đề cử' />
        {!!product && <Sliders data={product.length > 0 ? product : []} />}
      </div>
    </div>
  );
};
export default Home;
