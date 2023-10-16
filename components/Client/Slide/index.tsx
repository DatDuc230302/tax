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
        <div className="flex w-full justify-center my-4 px-[300px]">
            <Slider className="flex flex-col w-full outline-none" {...settings}>
                {slides.map((item: string, index: number) => (
                    <div key={index} className="flex relative w-[200px] h-[400px]">
                        <Image src={item} sizes="100000px" fill alt="" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
