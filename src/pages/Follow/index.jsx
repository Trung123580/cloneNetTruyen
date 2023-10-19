import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '~/FirebaseConfig';
import { UserLogin } from '~/components/Global';
import { Ranks, Card } from '~/components';
import TitlePath from '~/TitlePath';
import Title from '~/Title';
import style from './Follow.module.scss';
import { noFollow } from '~/assets';
const cx = classNames.bind(style);
export default function Follow() {
  const [userFollow, setUserFollow] = useState(null);
  const { info, isToggle } = useContext(UserLogin);
  const navigate = useNavigate();
  useEffect(() => {
    const getDocsFollow = async () => {
      const response = await getDocs(collection(db, 'users'));
      const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const findUser = data.find((user) => user.id === info?.uid);
      setUserFollow(findUser);
    };
    getDocsFollow();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [info?.uid]);
  const handleNavigateDetails = (details) => {
    navigate(`/details?details=${details}`);
  };
  const handleChapterReading = (e, comicsId, chapterId) => {
    e.stopPropagation();
    navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  const handleDeleteFollow = async (e, docId) => {
    e.stopPropagation();
    e.currentTarget.parentNode.parentNode.remove();
    const userDoc = doc(db, 'users', info?.uid);
    const newDataStory = userFollow.dataStory.filter(({ id }) => id !== docId);
    await updateDoc(userDoc, {
      dataStory: newDataStory,
    });
  };
  return (
    <>
      {userFollow ? (
        <>
          <div className={cx('container')}>
            {userFollow.dataStory.length > 0 ? (
              <div
                className={cx('follow', {
                  theme: isToggle ? false : true,
                })}>
                <TitlePath to='theo dõi' isToggle={isToggle} />
                <div className={cx('content')}>
                  <div>
                    <Title title='Truyện đang theo dõi' />
                    <div className={cx('listCard')}>
                      {userFollow?.dataStory.map((doc) => {
                        return (
                          <Card
                            data={doc}
                            key={doc.id}
                            onNavigateDetails={() => handleNavigateDetails(doc.id)}
                            onChapterReading={(e) => handleChapterReading(e, doc.id, doc.chapters[0].id)}
                            isToggle={isToggle}
                            onDeleteFollow={(e) => handleDeleteFollow(e, doc.id)}
                            unFollow='bỏ theo dõi'
                          />
                        );
                      })}
                    </div>
                  </div>
                  <Ranks isToggle={isToggle} />
                </div>
              </div>
            ) : (
              <div
                className={cx('follow', {
                  theme: isToggle ? false : true,
                })}>
                <TitlePath to='theo dõi' isToggle={isToggle} />
                <div className={cx('content')}>
                  <div>
                    <Title title='Truyện đang theo dõi' />
                    <div className={cx('no-follow')}>
                      <p>
                        Bạn chưa theo dõi truyện nào cả. Để <u>theo dõi</u> truyện, nhấn vào như hình bên dưới: Bạn nên
                        <span
                          className={cx({
                            isToggle: isToggle ? false : true,
                          })}>
                          Đăng nhập
                        </span>
                        để truy cập truyện đã theo dõi của bạn ở bất cứ đâu
                      </p>
                      <div className={cx('banner-error')}>
                        <img src={noFollow} alt='error-follow' />
                      </div>
                    </div>
                  </div>
                  <Ranks isToggle={isToggle} />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={cx('container')}>
          <div
            className={cx('follow', {
              theme: isToggle ? false : true,
            })}>
            <TitlePath to='theo dõi' isToggle={isToggle} />
            <div className={cx('content')}>
              <div>
                <Title title='Truyện đang theo dõi' />
                <div className={cx('no-follow')}>
                  <p>
                    Bạn chưa theo dõi truyện nào cả. Để <u>theo dõi</u> truyện, nhấn vào như hình bên dưới: Bạn nên
                    <span
                      className={cx({
                        isToggle: isToggle ? false : true,
                      })}>
                      Đăng nhập
                    </span>
                    để truy cập truyện đã theo dõi của bạn ở bất cứ đâu
                  </p>
                  <div className={cx('banner-error')}>
                    <img src={noFollow} alt='error-follow' />
                  </div>
                </div>
              </div>
              <Ranks isToggle={isToggle} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
