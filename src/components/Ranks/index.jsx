import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import style from './Ranks.module.scss';
import { UserLogin } from '~/components/Global';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { sidebarRank } from '~/constant';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { followCursor } from 'tippy.js';
import { callApiTopStory } from '~/utils/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loading from '~/Loading';
const cx = classNames.bind(style);
function Ranks({ isToggle }) {
  const [activeRank, setActiveRank] = useState('monthly');
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { info, firebaseUpdateHistory } = useContext(UserLogin);
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
  const handleNavigateDetails = (details) => {
    navigate(`/details?details=${details}`);
    window.location.reload();
    setProduct(null);
  };
  const handleChapterReading = async (e, comicsId, chapterId, userInfo) => {
    e.stopPropagation();
    console.log(userInfo);
    console.log(comicsId, chapterId);
    // if (info) await firebaseUpdateHistory(info?.uid, userInfo);
    // navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  return (
    <div className={cx('rank')}>
      <div className={cx('heading')}>
        {sidebarRank.map((item) => (
          <button
            key={uuid()}
            onClick={() => handleToggleRanks(item?.rank)}
            className={cx({
              active: activeRank === item?.rank, // state hiện tại bằng gì nó sẽ được active
              isToggle: isToggle ? false : true,
            })}>
            {item?.name}
          </button>
        ))}
      </div>
      <div className={cx('content')} style={{ minHeight: !!product ? 'auto' : '720px' }}>
        {!!product ? (
          product.map((userInfo, index) => {
            return (
              index <= 9 && (
                <div className={cx('product')} key={userInfo.id} onClick={() => handleNavigateDetails(userInfo.id)}>
                  <div
                    className={cx('count', {
                      active: isToggle ? false : true,
                    })}>{`${index === 9 ? 10 : `0${index + 1}`}`}</div>
                  <div className={cx('info')}>
                    <div className={cx('avatar')}>
                      <img src={userInfo.thumbnail} alt='' />
                    </div>
                    <div className={cx('text')}>
                      <Tippy
                        content={<span style={{}}>{userInfo.title}</span>}
                        followCursor='horizontal'
                        plugins={[followCursor]}
                        placement='top'
                        arrow={false}
                        duration={300}>
                        <h3
                          className={cx({
                            active: isToggle ? false : true,
                          })}>
                          {userInfo.title}
                        </h3>
                      </Tippy>
                      <div className={cx('label')} onClick={(e) => handleChapterReading(e, userInfo.id, userInfo.last_chapter?.id, userInfo)}>
                        <span
                          className={cx('chapter', {
                            active: isToggle ? false : true,
                          })}>
                          {userInfo?.last_chapter?.name}
                        </span>
                        <span
                          className={cx('view', {
                            active: isToggle ? false : true,
                          })}>
                          <VisibilityIcon fontSize='small' /> <span>{userInfo.total_views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })
        ) : (
          <div>
            <Loading size='4rem' />
          </div>
        )}
      </div>
    </div>
  );
}

export default Ranks;
