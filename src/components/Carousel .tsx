import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function Carousel(props: { images: string[] }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,  // Shows 3 images per slide by default
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            {
                props.images.map((image, index) => {
                    return (
                        <div className="px-1">
                            <img className='screenshot-slider' src={`images/screenshots/${image}`} alt={`slide ${index}`} />
                        </div>
                    );
                })
            }
        </Slider>
    );
}