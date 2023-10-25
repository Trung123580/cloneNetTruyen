import axios from 'axios';
import { createContext, useState, useEffect, useRef } from 'react';
import { FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, FbProvider, GgProvider } from '~/FirebaseConfig';
import { db } from '~/FirebaseConfig';
import { v4 as uuid } from 'uuid';
import { getDocs, collection, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
const UserLogin = createContext();
function Login({ children }) {
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);
  const [isInfo, setIsInfo] = useState(false);
  const [isToggle, setIsToggle] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const bodyRef = useRef(document.body);
  const navBar = useRef();
  const refTextAria = useRef();
  const usersCollection = collection(db, 'users');
  useEffect(() => {
    bodyRef.current.style = `background :${isToggle ? '#ebebeb' : '#1a1a1a'} ;color: ${isToggle ? '#333' : '#fff'}`;
  }, [isToggle]);
  const handleLogin = async (authProvide) => {
    await signInWithPopup(auth, authProvide)
      .then(async (res) => {
        const { displayName: name, email, uid } = res.user;
        console.log(res.user);
        if (authProvide === FbProvider) {
          const credential = FacebookAuthProvider.credentialFromResult(res);
          const accessToken = credential.accessToken;
          fetch(`https://graph.facebook.com/me/picture?type=large&access_token=${accessToken}`)
            .then((response) => response.blob())
            .then(async (blob) => {
              const imgUrl = URL.createObjectURL(blob);
              setUser({ name, email, imgUrl, uid, logWith: 'Facebook', firstName: '', lastName: '', sex: '', rank: '' });
              const data = await getDocs(usersCollection);
              const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
              const loggedInUser = userData.some((user) => user.id === uid);
              if (!loggedInUser) {
                await setDoc(doc(db, 'users', uid), {
                  name: name,
                  email: email,
                  avatar: imgUrl,
                  dataStory: [],
                  dataHistory: [],
                });
                await axios
                  .post(`https://deploy-net-tuyen-hmgp.vercel.app/create/user`, {
                    name,
                    email,
                    imgUrl,
                    uid,
                    firstName: '',
                    lastName: '',
                    sex: '',
                    rank: '',
                  })
                  .then((res) => console.log('post thanh cong'))
                  .catch((err) => console.log(err));
              }
            });
        }
        if (authProvide === GgProvider) {
          const imgUrl = res.user.photoURL;
          setUser({ name, email, imgUrl, uid, logWith: 'Google', firstName: '', lastName: '', sex: '', rank: '' });
          const data = await getDocs(usersCollection);
          const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          const loggedInUser = userData.some((user) => user.id === uid);
          if (!loggedInUser) {
            await setDoc(doc(db, 'users', uid), {
              name: name,
              email: email,
              avatar: imgUrl,
              dataStory: [],
              dataHistory: [],
            });
            await axios
              .post(`https://deploy-net-tuyen-hmgp.vercel.app/create/user`, {
                name,
                email,
                imgUrl,
                uid,
                firstName: '',
                lastName: '',
                sex: '',
                rank: '',
              })
              .then((res) => console.log('post thanh cong'))
              .catch((err) => console.log(err));
          }
        }
        setIsInfo(true); //linh canh navigate
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ------------------------------------------------- dang nhap email password-----------------
  const onSubmitLogin = async (data) => {
    console.log(data);
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then(async (userInfo) => {
        const authUser = userInfo.user;
        const { displayName: name, email, uid, photoURL: imgUrl } = authUser;
        setUser({ name, email, imgUrl, uid, logWith: 'Email', firstName: '', lastName: '', sex: '', rank: '' });
        setIsInfo(true); //linh canh navigate
        const data = await getDocs(usersCollection);
        const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const loggedInUser = userData.some((user) => user.id === uid);
        if (!loggedInUser) {
          await setDoc(doc(db, 'users', uid), {
            name: name,
            email: email,
            avatar: imgUrl,
            dataStory: [],
            dataHistory: [],
          });
          await axios
            .post(`https://deploy-net-tuyen-hmgp.vercel.app/create/user`, {
              name,
              email,
              imgUrl,
              uid,
              firstName: '',
              lastName: '',
              sex: '',
              rank: '',
            })
            .then((res) => console.log('post thanh cong'))
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        console.error(error.code, error.message);
        alert('Tài khoản chưa được đăng ký');
        // Xử lý lỗi đăng nhập
      });
  };

  const onSubmitRegister = async (data) => {
    const { email, password, name } = data;
    await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
      .then(async (userRegister) => {
        const authUser = userRegister.user;
        await updateProfile(authUser, { displayName: name });
        await axios
          .post(`https://deploy-net-tuyen-hmgp.vercel.app/create/user`, {
            name: name,
            email: email,
            imgUrl: '',
            uid: uuid(),
            firstName: '',
            lastName: '',
            sex: '',
            rank: '',
          })
          .then((res) => {
            alert('đăng ký thành công');
          })
          .catch((err) => console.log(err));
        return;
      })
      .catch((error) => {
        console.error(error.code, error.message);
        handleOpenModal();
      });
  };
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    const infoUser = localStorage.getItem('user');
    const value = !!infoUser && JSON.parse(infoUser);
    setInfo(value);
  }, [user]);
  //lich su doc truyen
  const firebaseUpdateHistory = async (id, detailsProduct) => {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, {
      dataHistory: arrayUnion({
        ...detailsProduct,
      }),
    });
  };
  // truyen follow
  const firebaseUpdateStory = async (id, detailsProduct) => {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, {
      dataStory: arrayUnion({
        ...detailsProduct,
      }),
    });
  };
  const value = {
    // xử lý login user
    handleLogin,
    onSubmitLogin,
    onSubmitRegister,
    info,
    setInfo, //singOut user
    isInfo,
    setIsInfo,
    // ---firebase---
    firebaseUpdateHistory,
    firebaseUpdateStory,
    // ----------------------------------- //
    // responsive
    navBar,
    // toggleThem
    isToggle,
    setIsToggle,
    // refTextAria
    refTextAria,
    handleCloseModal,
    open,
  };
  return <UserLogin.Provider value={value}>{children}</UserLogin.Provider>;
}

export { Login, UserLogin };
