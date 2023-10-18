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

    const slides = ['/imgs/avatar.jpg', '/imgs/avatar.jpg', '/imgs/avatar.jpg'];

    return (
        <div className="flex justify-center">
            <div className="flex w-[1200px] justify-center">
                <Slider className="flex md1:w-full md:w-[600px] w-[400px] flex-col items-center" {...settings}>
                    {slides.map((item: string, index: number) => (
                        <div key={index} className="flex relative md1:w-full md1:h-[600px] md:h-[500px] h-[400px]">
                            <Image className="object-cover" src={item} sizes="100000px" fill alt="" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
