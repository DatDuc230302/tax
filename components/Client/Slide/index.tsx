'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Slide() {
    const slides = ['/imgs/slides/slide1.jpg', '/imgs/slides/slide2.jpg', '/imgs/slides/slide3.jpg'];

    const getBanners = async () => {};

    return (
        <div className="flex justify-center px-4">
            <div className="flex w-wMain justify-center">
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    transitionTime={500}
                    interval={5000}
                    showArrows={false}
                    showStatus={false}
                    className="w-full"
                    emulateTouch={true}
                    swipeable={true}
                >
                    {slides.map((item: any) => (
                        <div className="w-full h-[400px] md:h-[600px] lg:h-[750px]" key={item}>
                            <Image src={item} fill sizes="100000px" alt="Slide 1" />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
