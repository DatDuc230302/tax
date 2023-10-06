'use client';

import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Image from 'next/image';

export default function Slide() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const slides = ['/imgs/slides/slide1.jpg', '/imgs/slides/slide2.jpg', '/imgs/slides/slide3.jpg'];

    return (
        <div className="flex flex-col mb-4">
            <Slider {...settings}>
                {slides.map((item: string, index: number) => (
                    <div className="flex">
                        <Image
                            key={index}
                            src={item}
                            layout="responsive"
                            width={0}
                            height={135}
                            className="object-cover"
                            alt=""
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
