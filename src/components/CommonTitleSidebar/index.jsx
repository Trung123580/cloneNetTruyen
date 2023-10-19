import SidebarCard from './SidebarCard';
import classNames from 'classnames/bind';
import style from './CommonTitleSidebar.module.scss';
import SidebarTitle from './SidebarTitle';
const cx = classNames.bind(style);
function CommonTitleSidebar({ isToggle, title, data, onNavigateDetails, onChapterReading, onDeleteDocsUser, onNavigation }) {
  return (
    <div className={cx('history')}>
      <SidebarTitle isToggle={isToggle} title={title} onNav={onNavigation} />
      <div className={cx('content')}>
        <div className={cx('story')}>
          {!!data &&
            data.map((docs, index) => {
              if (index <= 6) {
                return (
                  <SidebarCard
                    key={docs?.id}
                    data={docs}
                    index={index}
                    isToggle={isToggle}
                    onNavigateDetails={() => onNavigateDetails(docs?.id)}
                    onChapterReading={(e) => onChapterReading(e, docs?.id, docs?.chapters[0]?.id || docs?.last_chapter.name)}
                    onDeleteDocsUser={(e) => onDeleteDocsUser(e, docs?.id)}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    </div>
  );
}

export default CommonTitleSidebar;
