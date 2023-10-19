import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '~/FirebaseConfig';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames/bind';
import style from './ReadStory.module.scss';
import Loading from '~/Loading';
import { UserLogin } from '~/components/Global';
import { callApiChapter, callApiDetails } from '~/utils/api';
import { Button } from '~/utils/common';
import TitlePath from '~/TitlePath';
import InfoIcon from '@mui/icons-material/Info';
import CottageIcon from '@mui/icons-material/Cottage';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
const cx = classNames.bind(style);
function ReadStory() {
  const [readChapter, setReadChapter] = useState(null);
  const [isFollowStory, setIsFollowStory] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [isAddFixed, setIsAddFixed] = useState(false);
  const [chapterApi, setChapterApi] = useState(0);
  const [selectChapter, setSelectChapter] = useState(0);
  const locationChapter = useLocation();
  const navigate = useNavigate();
  const { isToggle, info, firebaseUpdateStory } = useContext(UserLogin);
  console.log();
  useEffect(() => {
    const callApi = async () => {
      const urlParam = new URLSearchParams(locationChapter.search);
      const comicsId = urlParam.get('comicsId');
      const chapterId = Number(urlParam.get('chapterId'));
      const response = await callApiChapter(comicsId, selectChapter ? selectChapter : chapterId + chapterApi);
      setReadChapter({ ...response });
      const responseDetails = await callApiDetails(comicsId);
      setDetailsProduct({ ...responseDetails });
      const getUserStory = async () => {
        if (info?.uid) {
          const docRef = doc(db, 'users', info?.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const filterStory = docSnap.data();
            const arrData = filterStory?.dataStory;
            for (let i = 0; i < arrData.length; i++) {
              const item = arrData[i];
              if (item?.id.trim() === responseDetails?.id.trim()) {
                setIsFollowStory(true);
                break;
              }
              if (item?.id !== responseDetails?.id) {
                setIsFollowStory(false);
              }
            }
          }
        }
      };
      getUserStory();
    };
    callApi();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterApi, selectChapter]);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 240 ? setIsAddFixed(true) : setIsAddFixed(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleAddStory = async () => {
    if (info) await firebaseUpdateStory(info?.uid, detailsProduct);
    if (info) setIsFollowStory(true);
    if (!info) alert('chưa đang nhập không thể theo dõi');
  };
  const handleDeleteStory = async (idStory) => {
    const userDoc = doc(db, 'users', info?.uid);
    const docSnapshot = await getDoc(userDoc);
    const userData = docSnapshot.data();
    if (userData) {
      const filter = userData?.dataStory.filter(({ id }) => id !== idStory);
      await updateDoc(userDoc, { dataStory: filter });
    }
  };
  const handleNavigateHome = () => {
    navigate('/');
  };
  const handleNavigateDetails = (comic_name) => {
    const convert = comic_name.trim().split(' ').join('-').toLowerCase();
    navigate(`/details?details=${convert}`);
  };
  const handleNextChapter = () => {
    setSelectChapter(0);
    selectChapter ? setSelectChapter(selectChapter + 1) : setChapterApi(chapterApi + 1);
    setReadChapter(null);
  };
  const handlePrevChapter = () => {
    setSelectChapter(0);
    selectChapter ? setSelectChapter(selectChapter - 1) : setChapterApi(chapterApi - 1);
    setReadChapter(null);
  };
  return (
    <div style={{ background: '#1a1a1a' }}>
      {readChapter ? (
        <div className={cx('container')}>
          <div
            className={cx('heading', {
              theme: isToggle ? false : true,
            })}>
            <TitlePath isToggle={isToggle} chapter={readChapter?.comic_name} />
            <div className={cx('title')}>
              <h2
                className={cx({
                  isToggle: isToggle ? false : true,
                })}
                onClick={() => handleNavigateDetails(readChapter?.comic_name)}>
                {readChapter?.comic_name || 'Đang cập nhật'}{' '}
              </h2>
              <span
                className={cx({
                  isToggle: isToggle ? false : true,
                })}>
                {` - ` + readChapter?.chapter_name}
              </span>
            </div>
            <div
              className={cx('bg-heading', {
                isToggle: isToggle ? false : true,
              })}>
              <div className={cx('note')}>
                <InfoIcon fontSize='medium' />
                <span>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</span>
              </div>
              <nav
                className={cx('nav', {
                  scrollFixed: isAddFixed,
                })}>
                <div className={cx('nav-home')} onClick={handleNavigateHome}>
                  <CottageIcon fontSize='large' />
                </div>
                <div className={cx('list')} onClick={() => handleNavigateDetails(readChapter?.comic_name)}>
                  <FormatListBulletedIcon fontSize='large' />
                </div>
                <Button
                  onClick={handlePrevChapter}
                  icon={<ArrowBackIosNewIcon />}
                  disabled={readChapter?.chapters[readChapter?.chapters?.length - 1]?.name === readChapter?.chapter_name}
                  className='error'
                />
                <select
                  className={cx('select')}
                  value={readChapter.chapter_name} // Sử dụng giá trị của chương hiện tại làm giá trị mặc định hoặc được chọn
                  onChange={(e) => {
                    // Xử lý sự kiện khi người dùng chọn chương
                    const selectedChapterName = e.target.value;
                    // Cập nhật chương hoặc thực hiện các thao tác khác ở đây
                    readChapter.chapters.forEach(({ id, name }) => {
                      if (name === selectedChapterName) {
                        setSelectChapter(id);
                        setReadChapter(null);
                      }
                    });
                  }}>
                  {readChapter.chapters.map(({ name, id }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <Button
                  icon={<ArrowForwardIosIcon />}
                  className='error'
                  onClick={handleNextChapter}
                  disabled={readChapter?.chapters[0].name === readChapter?.chapter_name}
                />
                {isFollowStory ? (
                  <Button content='Đã theo dõi' className='error' icon={<CloseIcon />} onClick={() => handleDeleteStory(detailsProduct?.id)} />
                ) : (
                  <Button content='Theo dõi' className='success' onClick={handleAddStory} icon={<FavoriteIcon />} />
                )}
              </nav>
            </div>
          </div>
          <div className={cx('content')}>
            {readChapter.images.map(({ src, backup_src }, index) => {
              return (
                <div key={uuid()} className={cx('img')} tabIndex={index + 1}>
                  <img src={backup_src || src} alt='error' />
                </div>
              );
            })}
          </div>
          <div className={cx('read-footer')}>
            <div className={cx('btn-double')}>
              <Button
                onClick={handlePrevChapter}
                icon={<ArrowBackIosNewIcon />}
                content='Chap trước'
                className='error'
                disabled={readChapter?.chapters[readChapter?.chapters.length - 1].name === readChapter?.chapter_name}
              />
              <Button
                onClick={handleNextChapter}
                icon={<ArrowForwardIosIcon />}
                content='Chap sau'
                className='error'
                style={{ flexDirection: 'row-reverse' }}
                disabled={readChapter?.chapters[0].name === readChapter?.chapter_name}
              />
            </div>
            <TitlePath isToggle={isToggle} readChapter={{ chapter: readChapter?.chapter_name, name: readChapter?.comic_name }} />
          </div>
        </div>
      ) : (
        <>
          <div style={{ height: '100vh' }}></div>
          <Loading />
        </>
      )}
    </div>
  );
}

export default ReadStory;
