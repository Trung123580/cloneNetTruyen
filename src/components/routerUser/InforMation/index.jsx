import { PostName, PostTitle } from '~/utils/common';
import classNames from 'classnames/bind';
import style from './InforMation.module.scss';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CardStory from './CardStory';
import CardTitle from './CardTitle';
const cx = classNames.bind(style);
const inforMation = ({ userInfo, isToggle, listFollowStory, handle, listDashboard, info }) => {
  const { onRouterComponent, onNavigateDetails, onChapterReading, onDeleteFollow } = handle;
  return (
    <div className={cx('wrapper')}>
      <PostName content='thông tin chung' />
      <div className={cx('main')}>
        <div className={cx('account-info')}>
          <div className={cx('heading')}>
            <PostTitle content='Thông tin tài khoản' />
            <h5
              onClick={() => onRouterComponent(1, listDashboard.find((it, index) => index === 1).name)}
              className={cx({
                isToggle: isToggle ? false : true,
              })}>
              Chỉnh sửa <KeyboardArrowRightIcon />
            </h5>
          </div>
          <div className={cx('user')}>
            <div className={cx('user-level')}>
              <div className={cx('flex')}>
                <span>Cấp 1</span>
                <span>Cấp 2</span>
              </div>
              <div className={cx('progress')}>
                <span className={cx('range')}></span>
              </div>
            </div>
            <ul className={cx('info')}>
              <li className={cx('info-item')}>
                <span>Họ và tên</span>
                <span>{userInfo?.name}</span>
              </li>
              <li className={cx('info-item')}>
                <span>Email</span>
                <span>{userInfo?.email}</span>
              </li>
              <li className={cx('info-item')}>
                <span>Loại cấp bậc</span>
                <p>
                  <span>Bình thường</span>
                  <span
                    onClick={() => onRouterComponent(1, listDashboard.find((it, index) => index === 1).name)}
                    className={cx({
                      isToggle: isToggle ? false : true,
                    })}>
                    Thay đổi
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx('account-link')}>
          <PostTitle content={`Liên kết Tài khoản ${userInfo?.logWith || info?.logWith}`} />
          <div className={cx('user')}>
            <div className={cx('info')}>
              <div className={cx('info-item')}>
                <span>Trạng thái</span>
                <span>Đã liên kết</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('story-follow')}>
        <div className={cx('heading')}>
          <PostTitle content='Truyện theo dõi' />
          <h5
            onClick={() => onRouterComponent(2, listDashboard.find((it, index) => index === 2).name)}
            className={cx({
              isToggle: isToggle ? false : true,
            })}>
            Xem tất cả
            <KeyboardArrowRightIcon />
          </h5>
        </div>
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
export default inforMation;
