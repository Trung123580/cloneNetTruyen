import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle, Login } from '~/components/Global';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Login>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </Login>
  </>
);
