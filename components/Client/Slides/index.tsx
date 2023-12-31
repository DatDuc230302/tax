'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ClientContext } from '@/app/(client)/layout';

export default function Slides() {
    const dataContext: any = useContext(ClientContext);
    const slides: any = dataContext.slides;

    const arr = ['/imgs/slides/s1.jpg', '/imgs/slides/s2.jpg'];

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
                    {arr.map((item: any, index: number) => (
                        <div className="w-full h-[250px] xs:h-[400px] md:h-[600px] lg:h-[750px] relative" key={index}>
                            <Image priority src={item} fill sizes="100000px" alt={item.id} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
