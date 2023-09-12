import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Ranks.module.scss';
import { v4 as uuid } from 'uuid';
import { sidebarRank } from '~/constant';
import { callApiTopStory } from '~/utils/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loading from '~/Loading';
const cx = classNames.bind(style);
function Ranks({ isToggle }) {
  const [activeRank, setActiveRank] = useState('monthly');
  const [product, setProduct] = useState(null);
  console.log(product);
  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await callApiTopStory(activeRank);
        setProduct(response?.comics);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    callApi();
  }, [activeRank]);
  const handleToggleRanks = (rank) => {
    setActiveRank(rank);
    setProduct(null);
  };
  return (
    <div className={cx('rank')}>
      <div className={cx('heading')}>
        {sidebarRank.map((item) => (
          <>
            <button
              key={uuid()}
              onClick={() => handleToggleRanks(item?.rank)}
              className={cx({
                active: activeRank === item?.rank, // state hiện tại bằng gì nó sẽ được active
              })}>
              {item?.name}
            </button>
          </>
        ))}
      </div>
      <div className={cx('content')}>
        {!!product ? (
          product.map((item, index) => {
            const { last_chapter: lastChapter, title, total_views: totalViews, thumbnail: avatar } = item;
            if (index <= 9)
              return (
                <div className={cx('product')}>
                  <div
                    className={cx('count', {
                      active: isToggle ? false : true,
                    })}>{`${index === 9 ? 10 : `0${index + 1}`}`}</div>
                  <div className={cx('info')}>
                    <div className={cx('avatar')}>
                      <img src={avatar} alt='' />
                    </div>
                    <div className={cx('text')}>
                      <h3
                        className={cx({
                          active: isToggle ? false : true,
                        })}>
                        {title}
                      </h3>
                      <div className={cx('label')}>
                        <span
                          className={cx('chapter', {
                            active: isToggle ? false : true,
                          })}>
                          {lastChapter?.name}
                        </span>
                        <span className={cx('view')}>
                          <VisibilityIcon fontSize='small' /> <span>{totalViews}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
          })
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}

export default Ranks;
