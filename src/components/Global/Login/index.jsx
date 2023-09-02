import { createContext, useState, useEffect, useRef } from 'react';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, FbProvider, GgProvider } from '~/FirebaseConfig';
const UserLogin = createContext();
function Login({ children }) {
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);
  const navBar = useRef();
  const [isToggle, setIsToggle] = useState(true);
  const bodyRef = useRef(document.body);
  useEffect(() => {
    bodyRef.current.style = `background :${isToggle ? '#ebebeb' : '#1a1a1a'} ;color: ${isToggle ? '#333' : '#fff'}`;
  }, [isToggle]);
  const handleLogin = async (authProvide) => {
    await signInWithPopup(auth, authProvide)
      .then((res) => {
        const { displayName: name, email } = res.user;
        if (authProvide === FbProvider) {
          const credential = FacebookAuthProvider.credentialFromResult(res);
          const accessToken = credential.accessToken;
          fetch(`https://graph.facebook.com/me/picture?type=large&access_token=${accessToken}`)
            .then((response) => {
              return response.blob();
            })
            .then((blob) => {
              const imgUrl = URL.createObjectURL(blob);
              setUser({ name, email, imgUrl });
            });
        }
        if (authProvide === GgProvider) {
          const imgUrl = res.user.photoURL;
          setUser({ name, email, imgUrl });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    const infoUser = localStorage.getItem('user');
    const value = infoUser ? JSON.parse(infoUser) : null;
    setInfo(value);
  }, [user]);
  const value = {
    // xử lý login user
    handleLogin,
    info,
    setInfo, //singOut user
    // ----------------------------------- //
    // responsive
    navBar,
    // toggleThem
    isToggle,
    setIsToggle,
  };
  return <UserLogin.Provider value={value}>{children}</UserLogin.Provider>;
}
export { Login, UserLogin };
