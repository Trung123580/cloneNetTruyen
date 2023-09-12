import { useState, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Details.module.scss';
import { callApiDetails } from '~/utils/api';
import TitlePath from '~/TitlePath';
import Loading from '~/Loading';
const cx = classNames.bind(style);
function Details() {
  const [detailsProduct, setDetailsProduct] = useState(null);
  console.log(detailsProduct);
  const locations = useLocation();
  useEffect(() => {
    const callApi = async () => {
      const urlParam = new URLSearchParams(locations.search);
      const details = urlParam.get('details');
      try {
        const response = await callApiDetails(details);
        setDetailsProduct(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    callApi();
  }, []);
  return (
    <div>
      {detailsProduct ? (
        <div className={cx('container')}>
          <div className={cx('details')}>
            <div className={cx('main')}>
              <TitlePath title={detailsProduct.title} />
              <div className={cx('content')}>
                <h2 className={cx('title')}>{detailsProduct.title}</h2>
                <div className={cx('info')}>
                  <div className={cx('avatar')}>
                    <img src='' alt={detailsProduct.title} />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('sidebar')}></div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default memo(Details);
