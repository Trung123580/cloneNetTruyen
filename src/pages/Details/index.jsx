import { useState, memo, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callApi, nameGenres } from '~/ReduxToolkit/callApiRedux';
import { db } from '~/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import classNames from 'classnames/bind';
import style from './Details.module.scss';
import { callApiDetails } from '~/utils/api';
import { UserLogin } from '~/components/Global';
import { Button, ListTitle, ModalShow } from '~/utils/common';
import TitlePath from '~/TitlePath';
import Loading from '~/Loading';
import { Sidebar } from '~/components';
import ChapterPageDetails from './ChapterPageDetails';
import { sortInit, sortReverse } from '~/assets';
import AddIcon from '@mui/icons-material/Add';
import Person2Icon from '@mui/icons-material/Person2';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import StyleIcon from '@mui/icons-material/Style';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
const cx = classNames.bind(style);
function Details() {
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [isShowDesc, setIsShowDesc] = useState(true);
  const [isShowChapter, setIsShowChapter] = useState(true);
  const [isIconSort, setIsIconSort] = useState(true);
  const [isFollowStory, setIsFollowStory] = useState(false);
  const { isToggle, info, firebaseUpdateStory, firebaseUpdateHistory } = useContext(UserLogin);
  console.log(detailsProduct);

  //modale
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  //
  const locations = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const callApi = async () => {
      const urlParam = new URLSearchParams(locations.search);
      const details = urlParam.get('details');
      try {
        const response = await callApiDetails(details);
        setDetailsProduct(response);
        const getUserStory = async () => {
          if (info?.uid) {
            const docRef = doc(db, 'users', info?.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const filterStory = docSnap.data();
              const arrData = filterStory?.dataStory;
              for (let i = 0; i < arrData.length; i++) {
                const item = arrData[i];
                if (item.id.trim() === response.id.trim()) {
                  setIsFollowStory(true);
                  break;
                }
                if (item.id !== response.id) {
                  setIsFollowStory(false);
                }
              }
            }
          }
        };
        getUserStory();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    callApi();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [locations.search]);
  // khi dang o page details lick zo 1 product ko chuyen huong chi reload lai de lay data moi
  const handleNavigateCategory = (idGenres, name) => {
    dispatch(callApi(idGenres));
    dispatch(nameGenres(name));
    // dispatch(descriptionStory(description));
    navigate(`/category?${idGenres}`);
  };
  //truyen follow
  const handleAddStory = async () => {
    if (info) await firebaseUpdateStory(info?.uid, detailsProduct);
    if (info) setIsFollowStory(true);
    if (!info) handleOpenModal(true);
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
  const handleChapterReading = async (comicsId, chapterId) => {
    if (info) await firebaseUpdateHistory(info?.uid, detailsProduct);
    navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  return (
    <>
      {detailsProduct ? (
        <div className={cx('container')}>
          <div
            className={cx('details', {
              isToggle: isToggle ? false : true,
            })}>
            <div className={cx('main')}>
              <TitlePath title={detailsProduct?.title} isToggle={isToggle} />
              <div className={cx('content')}>
                <h2 className={cx('title')}>{detailsProduct?.title}</h2>
                <div
                  className={cx('info', {
                    isToggle: isToggle ? false : true,
                  })}>
                  <div className={cx('center')}>
                    <div className={cx('avatar')}>
                      <img src={detailsProduct?.thumbnail} alt={detailsProduct?.title} />
                    </div>
                  </div>
                  <div>
                    <ul className={cx('menu')}>
                      <li className={cx('item')}>
                        {detailsProduct?.other_names[0] === undefined ? (
                          <></>
                        ) : (
                          <>
                            <span>
                              <AddIcon fontSize='large' /> Tên Khác
                            </span>
                            <p>{detailsProduct?.other_names}</p>
                          </>
                        )}
                      </li>
                      <li className={cx('item')}>
                        <span>
                          <Person2Icon fontSize='large' /> Tác giả
                        </span>
                        <p>{detailsProduct.authors === '' ? 'Đang cập nhật ' : detailsProduct.authors}</p>
                      </li>
                      <li className={cx('item')}>
                        <span>
                          <RssFeedIcon fontSize='large' /> Tình trạng
                        </span>
                        <p>{detailsProduct?.status === 'Ongoing' ? 'Đang cập nhật' : 'Hoàn thành'}</p>
                      </li>
                      <li className={cx('item')}>
                        <span>
                          <StyleIcon fontSize='large' /> Thể loại
                        </span>
                        <p>
                          {detailsProduct?.genres.map((item, index, arr) => (
                            <span
                              key={item.id}
                              className={cx('genres', {
                                isToggle: isToggle ? false : true,
                              })}
                              onClick={() => handleNavigateCategory(item.id, item.name)}>
                              {item.name}
                              <strong style={{ color: isToggle ? '#333' : '#fff ' }}>{index === arr.length - 1 ? '' : ' - '}</strong>
                            </span>
                          ))}
                        </p>
                      </li>
                      <li className={cx('item')}>
                        <span>
                          <VisibilityIcon fontSize='large' /> Lượt xem
                        </span>
                        <p>{detailsProduct?.total_views.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</p>
                      </li>
                    </ul>
                    <div className={cx('btn-group')}>
                      <div className={cx('follow')}>
                        {isFollowStory ? (
                          <Button
                            content='Đã theo dõi'
                            className='error'
                            icon={<CloseIcon />}
                            onClick={() => handleDeleteStory(detailsProduct?.id)}
                          />
                        ) : (
                          <Button content='Theo dõi' className='success' onClick={handleAddStory} icon={<FavoriteIcon />} />
                        )}
                        <p
                          className={cx({
                            isToggle: isToggle ? false : true,
                          })}>
                          {detailsProduct?.followers.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                          <span
                            className={cx({
                              isToggle: isToggle ? false : true,
                            })}>
                            Lượt theo dõi
                          </span>
                        </p>
                      </div>
                      <div className={cx('double-btn')}>
                        {!!detailsProduct && (
                          <>
                            <Button
                              content='Đọc từ đầu'
                              className='warning'
                              onClick={() => handleChapterReading(detailsProduct.id, detailsProduct.chapters[detailsProduct.chapters.length - 1].id)}
                            />
                            <Button
                              content='Đọc mới nhất'
                              className='warning'
                              onClick={() => handleChapterReading(detailsProduct.id, detailsProduct.chapters[0].id)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('description')}>
                  <ListTitle icon={<TextSnippetOutlinedIcon fontSize='large' />} content='nội dung' isToggle={isToggle} />
                  <p
                    className={cx({
                      showDesc: isShowDesc,
                      isToggle: isToggle ? false : true,
                    })}>
                    {detailsProduct.description}
                  </p>
                  {isShowDesc ? (
                    <span
                      className={cx({
                        isToggle: isToggle ? false : true,
                      })}
                      onClick={() => setIsShowDesc(!isShowDesc)}>
                      Xem thêm
                      <KeyboardArrowRightIcon />
                    </span>
                  ) : (
                    <span
                      className={cx({
                        isToggle: isToggle ? false : true,
                      })}
                      onClick={() => setIsShowDesc(!isShowDesc)}>
                      <KeyboardArrowLeftIcon />
                      Thu gọn
                    </span>
                  )}
                </div>
                <div className={cx('list-chapter')}>
                  <ListTitle icon={<FormatListBulletedIcon fontSize='large' />} content='danh sách chương' isToggle={isToggle} />
                  <div className={cx('menu')}>
                    <div className={cx('heading')}>
                      <span>Số Chương</span>
                      <span>Cập nhật</span>
                      <span>Xem</span>
                      <img
                        className={cx('sort-icon')}
                        src={isIconSort ? sortInit : sortReverse}
                        alt='error'
                        onClick={() => setIsIconSort(!isIconSort)}
                      />
                    </div>
                    <nav>
                      <ul
                        className={cx('list', {
                          showChapter: isShowChapter,
                          reverseChapter: isIconSort ? false : true,
                        })}>
                        {detailsProduct.chapters.map(({ id, name }, index) => {
                          return (
                            <ChapterPageDetails
                              index={index}
                              key={id}
                              name={name}
                              isToggle={isToggle}
                              onChapterReading={() => handleChapterReading(detailsProduct?.id, id)}
                            />
                          );
                        })}
                      </ul>
                      {isShowChapter && (
                        <div
                          className={cx('show-chapter', {
                            isToggle: isToggle ? false : true,
                          })}
                          onClick={() => setIsShowChapter(!isShowChapter)}>
                          <LocalHospitalOutlinedIcon fontSize='large' /> Xem thêm
                        </div>
                      )}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <Sidebar isToggle={isToggle} />
          </div>
          <ModalShow
            isToggle={isToggle}
            open={open}
            onCloseModal={handleCloseModal}
            title='Bạn chưa đang nhập để theo dõi truyện'
            description='Bạn hãy đăng nhập để theo dõi truyện yêu thích / nếu chưa có tài khoản hãy tạo bằng gmail hoặc đăng nhập trược tiếp bằng Facebook hay Goggle'
          />
        </div>
      ) : (
        <>
          <div style={{ height: '100vh' }}></div>
          <Loading />
        </>
      )}
    </>
  );
}

export default memo(Details);
