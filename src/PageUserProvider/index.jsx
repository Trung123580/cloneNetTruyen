import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { listDashboard } from '~/constant';
import { UserLogin } from '~/components/Global/Login';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '~/FirebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
export const PageUserContext = createContext();
const PageUserProvider = ({ children }) => {
  const [renderComponent, setRenderComponent] = useState(0);
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [title, setTitle] = useState('Thông tin chung');
  const [reRender, setReRender] = useState(false);
  const [listFollowStory, setListFollowStory] = useState(null);
  const [userProfile, setUserProfile] = useState([]);
  const [listUrl, setListUrl] = useState([]);
  // onChange
  const [changeInputFirstName, setChangeInputFirstName] = useState('');
  const [changeInputLastName, setChangeInputLastName] = useState('');
  const [changeSelectSex, setOnchangeSex] = useState('');
  const [changeSelectRank, setChangeSelectRank] = useState('Bình thường');
  //modale
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  //
  const { info, setInfo } = useContext(UserLogin);
  const navigate = useNavigate();
  useEffect(() => {
    const getListFollowUser = async () => {
      const data = await getDocs(collection(db, 'users'));
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const loggedInUser = userData.find((user) => user.id === info?.uid);
      setListFollowStory(loggedInUser);
      if (info) {
        await axios
          .get(`http://localhost:8081/user${info?.uid}`)
          .then((response) => {
            const [userInfo] = response.data;
            setUserProfile(userInfo);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getListFollowUser();
  }, [info]);
  // show sidebar
  const handleOpenSidebar = () => {
    setIsShowSidebar(!isShowSidebar);
  };
  //routerComponents
  const handleRouterComponent = (index, titleName) => {
    setRenderComponent(index);
    setTitle(titleName);
  };
  //details
  const handleNavigateDetails = (urlDetails) => {
    navigate(`/details?details=${urlDetails}`);
  };
  // readChapter
  const handleChapterReading = (e, comicsId, chapterId) => {
    e.stopPropagation();
    navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  //un follow
  const handleDeleteFollow = async (e, docId) => {
    e.stopPropagation();
    e.currentTarget.parentNode.parentNode.remove();
    const userDoc = doc(db, 'users', info?.uid);
    const newDataStory = listFollowStory.dataStory.filter(({ id }) => id !== docId);
    await updateDoc(userDoc, {
      dataStory: newDataStory,
    });
  };
  // upload anh
  const handleUploadImage = async (fileInput) => {
    if (fileInput === null || undefined) return;
    const inputFile = document.querySelector('#upload-img');
    const file = fileInput.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      inputFile.src = e.target.result;
    };
    reader.readAsDataURL(file);
    const imageRef = ref(storage, `images/${info.uid}/${fileInput.target.files[0]?.name}`);
    await uploadBytes(imageRef, fileInput.target.files[0]).then(() => {
      // alert('upload anh thanh cong');
    });
    // cap nhat hinh anh tam thoi
    setReRender(!reRender);
  };
  // eslint-disable-next-line
  useEffect(() => {
    if (!info) return;
    const imageListRef = ref(storage, `/images/${info?.uid}`);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setListUrl((prev) => [...prev, url]);
        });
      });
    });
  }, [reRender, info?.uid]);
  // Change
  const handleChangeInputFirstName = (e) => {
    setChangeInputFirstName(e.target.value);
  };
  const handleChangeInputLastName = (e) => {
    setChangeInputLastName(e.target.value);
  };
  const handleChangeSelectSex = (e) => {
    setOnchangeSex(e.target.value);
  };
  const handleChangeSelectRank = (e) => {
    setChangeSelectRank(e.target.value);
  };
  //

  const handleSubmitEditUser = async (e) => {
    e.preventDefault();
    if (listUrl.length < 0) return;
    const firstName = document.querySelector('#first-name');
    const lastName = document.querySelector('#last-name');
    if (!firstName.value || !lastName.value) {
      handleOpenModal();
      return;
    }
    const data = {
      imgUrl: listUrl[listUrl.length - 1] || listUrl[0] || info?.imgUrl,
      firstName: changeInputFirstName || userProfile?.firstName,
      lastName: changeInputLastName || userProfile?.lastName,
      sex: changeSelectSex,
      rank: changeSelectRank,
    };
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...info,
        ...data,
      })
    );
    const user = JSON.parse(localStorage.getItem('user'));
    setInfo(user);
    await axios
      .put(`http://localhost:8081/update/user${info?.uid}`, { ...data })
      .then((res) => alert('Sửa đổi thành công'))
      .catch((err) => console.log(err));
  };
  const handleRouterDefault = () => {
    setRenderComponent(0);
  };
  const values = {
    renderComponent,
    title,
    listFollowStory,
    listDashboard,
    isShowSidebar,
    userProfile,
    info,
    handle: {
      onRouterComponent: handleRouterComponent,
      onNavigateDetails: handleNavigateDetails,
      onChapterReading: handleChapterReading,
      onDeleteFollow: handleDeleteFollow,
      onOpenSidebar: handleOpenSidebar,
      onUploadImage: handleUploadImage,
      onSubmitEditUser: handleSubmitEditUser,
      // change
      onChangeFirstName: handleChangeInputFirstName,
      onChangeLastName: handleChangeInputLastName,
      onChangeSelectSex: handleChangeSelectSex,
      onChangeSelectRank: handleChangeSelectRank,
      // modal
      onCloseModal: handleCloseModal,
      onRouterDefault: handleRouterDefault,
    },
    selectValue: {
      changeSelectSex,
      changeSelectRank,
      changeInputFirstName,
      changeInputLastName,
      open,
    },
  };
  return <PageUserContext.Provider value={values}>{children}</PageUserContext.Provider>;
};
export default PageUserProvider;
