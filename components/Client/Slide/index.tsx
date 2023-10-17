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
        <div className="flex w-full justify-center my-4">
            <Slider className="flex flex-col w-full outline-none" {...settings}>
                {slides.map((item: string, index: number) => (
                    <div key={index} className="flex relative h-[700px]">
                        <Image src={item} sizes="100000px" fill alt="" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
