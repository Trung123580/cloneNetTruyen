import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle, Login } from '~/components/Global';
import store from './ReduxToolkit/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <Login>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </Login>
    </Provider>
  </>
);
// .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') chuyển đổi 300000 thành 3.000.000
