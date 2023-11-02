'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function Slide() {
    const [banners, setBanners] = useState<object[]>([]);

    useEffect(() => {
        getBanners();
    }, []);

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
                    {banners.map((item: any, index: number) => (
                        <div className="w-full h-[250px] xs:h-[400px] md:h-[600px] lg:h-[750px] relative" key={index}>
                            <Image src={''} fill sizes="100000px" alt={item.id} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
