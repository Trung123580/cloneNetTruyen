import { PostName } from '~/utils/common';
import CardTitle from '../InforMation/CardTitle';
const UserNotification = ({ listFollowStory, isToggle, handle }) => {
  // const { onNavigateDetails, onChapterReading, onDeleteFollow } = handle;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <PostName content='Thông báo' />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <CardTitle value={{ first: 'Nội dung', last: 'Thời gian' }} style={{ gridTemplateColumns: '1fr 1fr !important' }} />
      </div>
    </div>
  );
};
export default UserNotification;
