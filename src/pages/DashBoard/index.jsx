import { useContext } from 'react';
import { UserLogin } from '~/components/Global/Login';
import { PageUserContext } from '~/PageUserProvider';
import { routerUserInfo } from '~/router';
import classNames from 'classnames/bind';
import { error } from '~/assets';
import style from './DashBoard.module.scss';
import TitlePath from '~/TitlePath';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const cx = classNames.bind(style);
const DashBoard = () => {
  const { isToggle } = useContext(UserLogin);
  const { info, title, renderComponent, handle, listFollowStory, listDashboard, isShowSidebar, selectValue, userProfile } =
    useContext(PageUserContext);
  const data = routerUserInfo.filter((item, index) => index === renderComponent);
  const { onRouterComponent, onOpenSidebar } = handle;
  return (
    <div className={cx('container')}>
      <div
        className={cx('dashboard', {
          theme: isToggle ? false : true,
        })}>
        <TitlePath to={title} isToggle={isToggle} />
        <div className={cx('main')}>
          <div className={cx('sidebar')}>
            <div className={cx('user')}>
              <div className={cx('avatar')}>
                <img src={userProfile?.imgUrl || info?.imgUrl || error} alt='error' />
              </div>
              <div className={cx('other-name')}>
                <div className={cx('flex')}>
                  <span>Tài khoản của</span>
                  <h4>{userProfile?.name || info?.name}</h4>
                </div>
                <KeyboardArrowDownIcon
                  fontSize='large'
                  onClick={onOpenSidebar}
                  style={{ transform: isShowSidebar ? 'rotate(0deg)' : 'rotate(180deg)', cursor: 'pointer', transition: '.3s' }}
                />
              </div>
            </div>
            {isShowSidebar && (
              <ul className={cx('list')}>
                {listDashboard.map((item, index) => (
                  <div key={item.id} className={cx('wrapper')}>
                    <li
                      className={cx('item', {
                        active: index === renderComponent,
                      })}
                      onClick={() => onRouterComponent(index, item.name)}>
                      {item.icon} {item.name}
                    </li>
                    <div
                      className={cx('line', {
                        active: index === renderComponent,
                      })}></div>
                  </div>
                ))}
              </ul>
            )}
          </div>
          {data.map((item) => {
            const { id, component: Components } = item;
            return (
              <Components
                key={id}
                userProfile={userProfile}
                isToggle={isToggle}
                listFollowStory={listFollowStory}
                handle={handle}
                listDashboard={listDashboard}
                selectValue={selectValue}
                info={info}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
