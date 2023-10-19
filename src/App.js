import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/router';
import { Footer, Header, Nav, BackToTop } from '~/components';
import PageUserProvider from '~/PageUserProvider';
function App() {
  return (
    <BrowserRouter>
      <PageUserProvider>
        <Header />
        <Nav />
        <main>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component; //convertJSX
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
        </main>
      </PageUserProvider>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
