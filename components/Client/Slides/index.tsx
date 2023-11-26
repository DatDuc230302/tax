'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { serverBackend } from '@/server';

export default function Slides({ slidesRes }: { slidesRes: any }) {
    let slides: any;
    if (slidesRes.message === 'success') {
        slides = slidesRes.data;
    } else {
        slides = [];
    }

    return (
        <div className="flex justify-center px-4 min-h-[450px]">
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
                    {slides.map((item: any, index: number) => (
                        <div className="w-full h-[250px] xs:h-[400px] md:h-[600px] lg:h-[750px] relative" key={index}>
                            <Image priority src={`${item.image_url}`} fill sizes="100000px" alt={item.id} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
