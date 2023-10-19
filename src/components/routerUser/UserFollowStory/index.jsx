import { PostName } from '~/utils/common';
import CardTitle from '../InforMation/CardTitle';
import CardStory from '../InforMation/CardStory';

const UserFollowStory = ({ listFollowStory, isToggle, handle }) => {
  const { onNavigateDetails, onChapterReading, onDeleteFollow } = handle;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <PostName content='Truyện đang theo dõi' />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <CardTitle />
        {!!listFollowStory &&
          listFollowStory?.dataStory.map((story) => (
            <CardStory
              key={story.id}
              data={story}
              onNavigateDetails={() => onNavigateDetails(story.id)}
              onChapterReading={(e) => onChapterReading(e, story.id, story.chapters[0].id)}
              onDeleteFollow={(e) => onDeleteFollow(e, story.id)}
              isToggle={isToggle}
            />
          ))}
      </div>
    </div>
  );
};
export default UserFollowStory;
