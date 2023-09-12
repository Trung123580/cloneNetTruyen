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
    // chuyen huong details
    if (details) navigate(`/details?details=${details}`);
  };
  // chuyen huong chappter
  // const handleNavigate = (details, chapterId) => {
  //   if ((details, chapterId)) navigate(`/details?details=${details}&chapter=${chapterId}`);
  // };
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
          return <SliderItem key={uuid()} item={item} onNavigate={handleNavigate} isToggle={isToggle} />;
        })}
    </Slider>
  );
};
export default Sliders;
