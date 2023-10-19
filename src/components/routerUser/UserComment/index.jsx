import { PostName } from '~/utils/common';
import CardTitle from '../InforMation/CardTitle';
const UserComment = ({ listFollowStory, isToggle, handle }) => {
  // const { onNavigateDetails, onChapterReading, onDeleteFollow } = handle;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <PostName content='Bình luận của tôi' />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <CardTitle />
      </div>
    </div>
  );
};
export default UserComment;
