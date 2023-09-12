import { Home, Hot, Follow, Search, History, Logins, Register, Category, Men, Women, ReadStory, Details } from '~/pages';
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
];
const navList = [
  //   // dùng khi không cần đăng nhập vẫn xem đx
  { name: 'Trang Chủ', icon: <CottageIcon fontSize='large' />, isMobile: true, path: '/', component: Home },
  { name: 'hot', path: '/hot', component: Hot },
  { name: 'theo dõi', path: '/follow', component: Follow },
  { name: 'lịch sử', path: '/history', component: History },
  { name: 'thể loại', categoryList: true, icon: <ArrowDropDownIcon fontSize='large' />, path: '/category', component: Category }, //tim` truyen
  { name: 'xếp hạng', ulList: true, block: true, path: '#', component: '/' }, //tim` truyen
  { name: 'tìm truyện', path: '/search', component: Search },
  { name: 'con gái', path: '/men', component: Men },
  { name: 'con trai ', path: '/women', component: Women },
];
const privateRoute = [
  // dùng khi phải  đăng nhập mới xem đx
];

export { publicRoutes, privateRoute, navList };
