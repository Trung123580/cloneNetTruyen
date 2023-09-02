import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { publicRoutes } from '~/router';
import { Header, Nav } from './components';
function App() {
  // const navigate = useNavigate();
  // const navigateProduct = (details, chapterId) => {
  //   if ((details, chapterId)) navigate(`/details?details=${details}&chapter=${chapterId}`);
  // };
  // const navigateDetails = (details, chapterId) => {
  //   if ((details, chapterId)) navigate(`/details?details=${details}`);
  // };
  // const nav = {
  //   navigateDetails,
  //   navigateProduct,
  // };
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <main>
        <Routes>
          {publicRoutes.map((route, index, arr) => {
            const Page = route.component; //convertJSX
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
