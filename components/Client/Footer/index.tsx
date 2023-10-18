import Image from 'next/image';
import React from 'react';

export default function Footer() {
    return (
        <div className="w-full flex justify-center bg-[#0B80FF] ">
            <div className="flex w-[1200px] h-[218px] text-white text-[26px]">
                <div className="w-full">
                    <div className="w-[120px] h-[60px] relative">
                        <Image src={'/imgs/logo.png'} fill sizes="100000px" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
