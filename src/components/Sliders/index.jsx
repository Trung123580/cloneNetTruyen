import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames/bind';
import style from './Sliders.module.scss';
import SliderItem from '../SliderItem';
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
  const navigate = useNavigate();
  const handleNavigate = (details, chapterId) => {
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
    slidesToScroll: 3,
    autoplaySpeed: 3500,
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
      {data ? (
        data.map((item, index) => {
          return <SliderItem key={index} item={item} onNavigate={handleNavigate} />;
        })
      ) : (
        <></>
      )}
    </Slider>
  );
};
export default Sliders;
