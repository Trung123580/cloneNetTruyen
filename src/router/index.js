import { Home, Hot, Follow, Search, History, Logins, Register, Category, Men, Women, ReadStory, Details, ForgetPassword, DashBoard } from '~/pages';
import {
  InforMation,
  UserProfile,
  UserFollowStory,
  UserUpdateStory,
  UserComment,
  UserNotification,
  UserChangePassword,
  UserSignOut,
} from '~/components/routerUser';
import { v4 as uuid } from 'uuid';
import CottageIcon from '@mui/icons-material/Cottage';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const publicRoutes = [
  //   // dùng khi không cần đăng nhập vẫn xem đx
  { path: '/', component: Home },
  { path: '/hot', component: Hot },
  { path: '/follow', component: Follow },
  { path: '/history', component: History },
  { path: '/search', component: Search }, //tim` truyen
  { path: '/#', component: '/' }, //tim` truyen
  { path: '/logins', component: Logins },
  { path: '/register', component: Register },
  { path: '/category', component: Category },
  { path: '/men', component: Men },
  { path: '/women', component: Women },
  { path: '/readStory', component: ReadStory },
  { path: '/details', component: Details },
  { path: '/forgetPassword', component: ForgetPassword },
  { path: '/dashboard', component: DashBoard },
];
const navList = [
  //   // dùng khi không cần đăng nhập vẫn xem đx
  { name: 'Trang Chủ', icon: <CottageIcon fontSize='large' />, isMobile: true, path: '/', component: Home },
  { name: 'hot', path: '/hot', component: Hot },
  { name: 'theo dõi', path: '/follow', component: Follow },
  { name: 'lịch sử', path: '/history', component: History },
  { name: 'thể loại', categoryList: true, icon: <ArrowDropDownIcon fontSize='large' />, path: '/category', component: Category }, //tim` truyen
  { name: 'xếp hạng', ulList: true, block: true, path: '#', component: '/' }, //tim` truyen
  { name: 'con gái', path: '/women', component: Men },
  { name: 'con trai ', path: '/men', component: Women },
];
const routerUserInfo = [
  { id: uuid(), component: InforMation },
  { id: uuid(), component: UserProfile },
  { id: uuid(), component: UserFollowStory },
  { id: uuid(), component: UserUpdateStory },
  { id: uuid(), component: UserComment },
  { id: uuid(), component: UserNotification },
  { id: uuid(), component: UserChangePassword },
  { id: uuid(), component: UserSignOut },
];
export { publicRoutes, navList, routerUserInfo };
