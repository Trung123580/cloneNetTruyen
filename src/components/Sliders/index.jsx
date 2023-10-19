import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames/bind';
import style from './Sliders.module.scss';
import SliderItem from '../SliderItem';
import { UserLogin } from '~/components/Global';
import { v4 as uuid } from 'uuid';
import { useContext } from 'react';
const cx = classNames.bind(style);
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={`${className} ${cx('next')}`} style={{ ...style, display: 'block' }} onClick={onClick} />;
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={`${className} ${cx('prev')}`} style={{ ...style, display: 'block' }} onClick={onClick} />;
}
const Sliders = ({ data }) => {
  const { isToggle } = useContext(UserLogin);
  const navigate = useNavigate();
  const handleNavigate = (details) => {
    if (details) navigate(`/details?details=${details}`);
  };
  const handleNavigateChapter = (e, comicsId, chapterId) => {
    e.stopPropagation();
    navigate(`/readStory?comicsId=${comicsId}&chapterId=${chapterId}`);
  };
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className={cx('card')}>
      {!!data &&
        data.map((item) => {
          return (
            <SliderItem
              key={uuid()}
              item={item}
              onNavigateChapter={(e) => handleNavigateChapter(e, item?.id, item?.lastest_chapter?.id || item?.last_chapter.id)}
              onNavigate={handleNavigate}
              isToggle={isToggle}
            />
          );
        })}
    </Slider>
  );
};
export default Sliders;
