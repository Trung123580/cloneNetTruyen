import { memo } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Title = ({ title }) => {
  const style = {
    color: '#2980b9',
    fontSize: '2rem',
    fontWeight: '400',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };
  return (
    <h2 style={style}>
      {title} <ArrowForwardIosIcon />
    </h2>
  );
};
export default memo(Title);
