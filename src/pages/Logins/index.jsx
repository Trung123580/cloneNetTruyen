import { useContext, memo } from 'react';
import { UserLogin } from '~/components/Global';
import { FbProvider, GgProvider } from '~/FirebaseConfig';
function Logins() {
  const { handleLogin, info } = useContext(UserLogin);
  return (
    <>
      {info ? (
        <>
          <div>co du lieu</div>
        </>
      ) : (
        <>
          <button onClick={() => handleLogin(FbProvider)}>login fb</button>
          <button onClick={() => handleLogin(GgProvider)}>GG fb</button>
        </>
      )}
    </>
  );
}
export default memo(Logins);
