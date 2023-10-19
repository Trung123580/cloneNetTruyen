import { useEffect, useContext, useState } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '~/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '~/components/Global';
import { CommonTitleSidebar, Ranks } from '~/components';
function Sidebar({ isToggle }) {
  const [listFollow, setListFollow] = useState([]);
  const [listHistory, setListHistory] = useState([]);
  const { info } = useContext(UserLogin);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const usersCollection = collection(db, 'users');
      const data = await getDocs(usersCollection);
      const userDatabase = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const find = userDatabase.find(({ id }) => id === info.uid);
      setListFollow(find?.dataStory);
      setListHistory(find?.dataHistory);
    };
    getUser();
  }, [info.uid]);
  const handleNavigateStory = () => {
    navigate('/follow'); // chuyển hướng page Follow
  };
  const handleNavigateHistory = () => {
    navigate('history'); // chuyển hướng page History
  };
  const handleNavigateDetails = (details) => {
    navigate(`/details?details=${details}`);
    window.location.reload();
  };
  const handleChapterReading = async (e, comicsId, chapterId) => {
    e.stopPropagation();
    navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  //history
  const handleDeleteDocsHistory = async (e, docId) => {
    e.stopPropagation();
    e.currentTarget.parentNode.parentNode.parentNode.remove();
    const userDoc = doc(db, 'users', info?.uid);
    const newDataHistory = listHistory.filter(({ id }) => id !== docId);
    await updateDoc(userDoc, {
      dataHistory: newDataHistory,
    });
  };
  // follow
  const handleDeleteDocsStory = async (e, docId) => {
    e.stopPropagation();
    e.currentTarget.parentNode.parentNode.parentNode.remove();
    const userDoc = doc(db, 'users', info?.uid);
    const newDataStory = listFollow.filter(({ id }) => id !== docId);
    await updateDoc(userDoc, {
      dataStory: newDataStory,
    });
  };
  return (
    <div className='sidebar ' style={{ minWidth: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <CommonTitleSidebar
        isToggle={isToggle}
        title='Truyện đang theo dõi'
        onShowAll
        data={listFollow}
        onNavigation={handleNavigateStory} // chuyển hướng page Follow
        onNavigateDetails={handleNavigateDetails}
        onChapterReading={handleChapterReading}
        onDeleteDocsUser={handleDeleteDocsStory} // xóa theo truyện follow
      />
      <CommonTitleSidebar
        isToggle={isToggle}
        title='Lịch sử đọc truyện'
        onShowAll
        data={listHistory}
        onNavigation={handleNavigateHistory} // chuyen huong page History
        onNavigateDetails={handleNavigateDetails}
        onChapterReading={handleChapterReading}
        onDeleteDocsUser={handleDeleteDocsHistory} // xóa lịch sử đọc truyện
      />
      <Ranks isToggle={isToggle} />
    </div>
  );
}

export default Sidebar;
