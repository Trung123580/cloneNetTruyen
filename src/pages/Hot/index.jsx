import TitlePath from '~/TitlePath';
import { useLocation } from 'react-router-dom';
export default function Hot() {
  const location = useLocation();
  if (location.pathname) console.log(true);
  return (
    <h1>
      <TitlePath to={location.pathname} />
    </h1>
  );
}
