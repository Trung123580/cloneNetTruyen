import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CachedIcon from '@mui/icons-material/Cached';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
const dataList = [
  { id: 'all', name: 'Tất cả', description: 'Tất cả thể loại truyện tranh', selector: true },

  { id: 'action-95', name: 'Action', description: 'Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh' },

  { id: 'truong-thanh', name: 'Adult', description: 'Thể loại Adult đề cập đến vấn đề nhạy cảm, chỉ dành cho tuổi 17+' },

  { id: 'adventure', name: 'Adventure', description: 'Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật' },

  { id: 'anime', name: 'Anime', description: 'Truyện đã được chuyển thể thành film Anime' },

  {
    id: 'chuyen-sinh-2130',
    name: 'Chuyển Sinh',
    description: 'Thể loại này là những câu chuyện về người ở một th…n chết ở nơi này và được chuyển sinh đến nơi khác',
  },

  {
    id: 'comedy-99',
    name: 'Comedy',
    description: 'Thể loại có nội dung trong sáng và cảm động, thườn…có các tình tiết gây cười, các xung đột nhẹ nhàng',
  },

  { id: 'comic', name: 'Comic', description: 'Truyện tranh Châu Âu và Châu Mĩ' },

  { id: 'cooking', name: 'Cooking', description: 'Thể loại có nội dung về nấu ăn, ẩm thực' },

  { id: 'co-dai-207', name: 'Cổ Đại', selector: true, description: 'Truyện có nội dung xảy ra ở thời cổ đại phong kiến.' },

  {
    id: 'doujinshi',
    name: 'Doujinshi',
    description: 'Thể loại truyện phóng tác do fan hay có thể cả nhữ…ể viết ra những câu chuyện theo sở thích của mình',
  },

  { id: 'drama-103', name: 'Drama', description: 'Thể loại mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn' },

  { id: 'dam-my', name: 'Đam Mỹ', selector: true, description: 'Truyện tình cảm giữa nam và nam.' },

  { id: 'ecchi', name: 'Ecchi', description: 'Thường có những tình huống nhạy cảm nhằm lôi cuốn người xem' },

  {
    id: 'fantasy-105',
    name: 'Fantasy',
    description: 'Thể loại xuất phát từ trí tưởng tượng phong phú, t…i trong mơ thậm chí là những câu chuyện thần tiên',
  },

  {
    id: 'gender-bender',
    name: 'Gender Bender',
    description: 'Là một thể loại trong đó giới tính của nhân vật bị lẫn lộn: nam hoá thành nữ, nữ hóa thành nam...',
  },

  { id: 'harem-107', name: 'Harem', description: 'Thể loại truyện tình cảm, lãng mạn mà trong đó, nhiều nhân vật nữ thích một nam nhân vật chính' },

  { id: 'historical', name: 'Historical', description: 'Thể loại có liên quan đến thời xa xưa' },

  {
    id: 'horror',
    name: 'Horror',
    description: 'Horror là: rùng rợn, nghe cái tên là bạn đã hiểu t… sock - một thể loại không dành cho người yếu tim',
  },

  { id: 'josei', name: 'Josei', description: 'Thể loại của manga hay anime được sáng tác chủ yếu…ủa Shoujo manga với cốt truyện rõ ràng, chín chắn' },

  { id: 'live-action', name: 'Live action', description: 'Truyện đã được chuyển thể thành phim' },

  { id: 'manga-112', name: 'Manga', description: 'Truyện tranh của Nhật Bản' },

  { id: 'manhua', selector: true, name: 'Manhua', description: 'Truyện tranh của Trung Quốc' },

  { id: 'manhwa-11400', name: 'Manhwa', description: 'Truyện tranh Hàn Quốc, đọc từ trái sang phải' },

  {
    id: 'martial-arts',
    name: 'Martial Arts',
    description: 'Giống với tên gọi, bất cứ gì liên quan đến võ thuậ…ate, judo hay taekwondo, kendo, các cách né tránh',
  },

  { id: 'mature', name: 'Mature', description: 'Thể loại dành cho lứa tuổi 17+ bao gồm các pha bạo lực, máu me, chém giết, tình dục ở mức độ vừa' },

  {
    id: 'mecha-117',
    name: 'Mecha',
    description: 'Mecha, còn được biết đến dưới cái tên meka hay mec…ng cỗ máy biết đi (thường là do phi công cầm lái)',
  },

  {
    id: 'mystery',
    name: 'Mystery',
    description: 'Thể loại thường xuất hiện những điều bí ấn không t… nhân vật chính nhằm tìm ra câu trả lời thỏa đáng',
  },

  {
    id: 'ngon-tinh',
    name: 'Ngôn Tình',
    selector: true,
    description: 'Truyện thuộc kiểu lãng mạn, kể về những sự kiện vui buồn trong tình yêu của nhân vật chính.',
  },

  { id: 'one-shot', name: 'One shot', description: 'Những truyện ngắn, thường là 1 chapter' },

  {
    id: 'psychological',
    name: 'Psychological',
    description: 'Thể loại liên quan đến những vấn đề về tâm lý của nhân vật ( tâm thần bất ổn, điên cuồng ...)',
  },

  {
    id: 'romance-121',
    name: 'Romance',
    selector: true,
    description: 'Thường là những câu chuyện về tình yêu, tình cảm l…là kích thích trí tưởng tượng của bạn về tình yêu',
  },

  { id: 'school-life', name: 'School Life', description: 'Trong thể loại này, ngữ cảnh diễn biến câu chuyện chủ yếu ở trường học' },

  {
    id: 'sci-fi',
    name: 'Sci-fi',
    description: 'Bao gồm những chuyện khoa học viễn tưởng, đa phần … học hiện thời, mà là do con người tưởng tượng ra',
  },

  {
    id: 'seinen',
    name: 'Seinen',
    description: 'Thể loại của manga thường nhằm vào những đối tượng…đề, có các loại từ mới mẻ tiên tiến đến khiêu dâm',
  },

  {
    id: 'shoujo',
    name: 'Shoujo',
    description: 'Đối tượng hướng tới của thể loại này là phái nữ. N…ạn, chú trọng đầu tư cho nhân vật (tính cách,...)',
  },

  {
    id: 'shoujo-ai-126',
    name: 'Shoujo Ai',
    description: 'Thể loại quan hệ hoặc liên quan tới đồng tính nữ, …hường giữa các nhân vật nữ trong các manga, anime',
  },

  {
    id: 'shounen-127',
    name: 'Shounen',
    description: 'Đối tượng hướng tới của thể loại này là phái nam. …/hoặc bạo lực (ở mức bình thường, không thái quá)',
  },

  {
    id: 'shounen-ai',
    name: 'Shounen Ai',
    description: 'Thể loại có nội dung về tình yêu giữa những chàng …hất lãng mạn nhưng ko đề cập đến quan hệ tình dục',
  },

  { id: 'slice-of-life', name: 'Slice of Life', description: 'Nói về cuộc sống đời thường' },

  { id: 'smut', name: 'Smut', description: 'Những truyện có nội dung hơi nhạy cảm, đặc biệt là liên quan đến tình dục' },

  { id: 'soft-yaoi', name: 'Soft Yaoi', description: 'Boy x Boy. Nặng hơn Shounen Ai tí.' },

  { id: 'soft-yuri', name: 'Soft Yuri', description: 'Girl x Girl. Nặng hơn Shoujo Ai tí' },

  {
    id: 'sports',
    name: 'Sports',
    description: 'Đúng như tên gọi, những môn thể thao như bóng đá, …đua xe, cầu lông,... là một phần của thể loại này',
  },

  {
    id: 'supernatural',
    name: 'Supernatural',
    description: 'Thể hiện những sức mạnh đáng kinh ngạc và không th… ngược hoặc thách thức với những định luật vật lý',
  },

  { id: 'thieu-nhi', name: 'Thiếu Nhi', description: 'Truyện tranh dành cho lứa tuổi thiếu nhi' },

  { id: 'tragedy-136', name: 'Tragedy', description: 'Thể loại chứa đựng những sự kiện mà dẫn đến kết cục là những mất mát hay sự rủi ro to lớn' },

  { id: 'trinh-tham', name: 'Trinh Thám', description: 'Các truyện có nội dung về các vụ án, các thám tử cảnh sát điều tra...' },

  { id: 'truyen-scan', name: 'Truyện scan', description: 'Các truyện đã phát hành tại VN được scan đăng online' },

  { id: 'truyen-mau', name: 'Truyện Màu', description: 'Tổng hợp truyện tranh màu, rõ, đẹp' },

  {
    id: 'webtoon',
    name: 'Webtoon',
    description: 'Là truyện tranh được đăng dài kỳ trên internet của…àn Quốc chứ không xuất bản theo cách thông thường',
  },
  {
    id: 'xuyen-khong-205',
    name: 'Xuyên Không',
    description: 'Xuyên Không, Xuyên Việt là thể loại nhân vật chính… xác mình hoặc sống lại bằng thân xác người khác',
    selector: true,
  },
];
const ranks = [
  { id: 'top', name: 'Top all', icon: <VisibilityIcon /> },
  { id: 'completed-comics', name: 'Truyện full', icon: <SignalCellularAltIcon />, color: true },
  { id: 'top/monthly', name: 'Top tháng', icon: <VisibilityIcon /> },
  { id: 'top/follow', name: 'Yêu thích', icon: <ThumbUpOffAltIcon />, user: true },
  { id: 'top/weekly', name: 'Top tuần', icon: <VisibilityIcon /> },
  { id: 'recent-update-comics', name: 'Mới cập nhật', icon: <CachedIcon /> },
  { id: 'top/daily', name: 'Top Ngày', icon: <VisibilityIcon /> },
  { id: 'new-comics', name: 'Truyện mới', icon: <CloudUploadIcon /> },
];
const loading = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'];
const sidebarRank = [
  {
    rank: 'monthly',
    name: 'Tốp Tháng',
  },
  {
    rank: 'weekly',
    name: 'Tốp Tuần',
  },
  {
    rank: 'daily',
    name: 'Tóp Ngày',
  },
];
export { dataList, ranks, loading, sidebarRank };
