'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function Slide() {
    const slides = ['/imgs/slides/slide1.jpg', '/imgs/slides/slide2.jpg', '/imgs/slides/slide3.jpg'];
    const [banners, setBanners] = useState<object[]>([]);

    const getBanners = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/bannerImages`);
            if (result.data.message === 'success') {
                setBanners(result.data.data);
            }
        } catch (error) {
            console.error('Error fetching banner images:', error);
        }
    };

    return (
        <div className="flex justify-center px-4">
            <div className="flex w-wMain justify-center">
                <Carousel
                    showThumbs={false}
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
                        <div className="w-full h-[250px] xs:h-[400px] md:h-[600px] lg:h-[750px] relative" key={item}>
                            <Image src={item} fill sizes="100000px" alt="Slide 1" />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
