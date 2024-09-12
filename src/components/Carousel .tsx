import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export function Carousel(props: { images: string[], slidesPer: number }) {
    return (
        <Swiper
        slidesPerView={props.slidesPer ? props.slidesPer : 3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="screenshot-gallery"
    >
        {
            props.images.map((image, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img src={`images/screenshots/${image}`} alt={`slide ${index}`} />
                    </SwiperSlide>
                );
            })
        }
    </Swiper>
    );
}