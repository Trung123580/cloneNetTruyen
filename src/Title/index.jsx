import { memo, useContext } from 'react';
import { UserLogin } from '~/components/Global';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Title = ({ title }) => {
  const { isToggle } = useContext(UserLogin);
  const style = {
    fontSize: '2rem',
    fontWeight: '400',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: isToggle ? '#2980b9' : '#ff9601',
  };
  return (
    <h2 style={style}>
      {title} <ArrowForwardIosIcon />
    </h2>
  );
};
export default memo(Title);
