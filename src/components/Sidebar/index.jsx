import { ReadingHistory, Ranks } from '~/components';
function Sidebar({ isToggle }) {
  return (
    <div className='sidebar ' style={{ minWidth: '100%' }}>
      <ReadingHistory />
      <Ranks isToggle={isToggle} />
    </div>
  );
}

export default Sidebar;
