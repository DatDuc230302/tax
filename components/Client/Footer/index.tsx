import Image from 'next/image';
import React from 'react';

export default function Footer() {
    return (
        <div className="w-full flex justify-center bg-[#0B80FF] py-4">
            <div className="flex w-[1200px] h-[218px] justify-between text-white">
                <div className="flex h-[60px] gap-2 items-center">
                    <div className="w-[60px] h-[60px] relative">
                        <Image src={'/imgs/logo.png'} fill sizes="100000px" alt="" />
                    </div>
                    <h2 className="font-bold text-[18px]">CHI CỤC THUẾ QUẬN 8</h2>
                </div>
                <div className="flex h-[60px] gap-2 items-center">
                    <div className="w-[60px] h-[60px] relative">
                        <Image src={'/imgs/logo.png'} fill sizes="100000px" alt="" />
                    </div>
                    <h2 className="font-bold text-[18px]">CHI CỤC THUẾ QUẬN 8</h2>
                </div>
                <div className="flex h-[60px] gap-2 items-center">
                    <div className="w-[60px] h-[60px] relative">
                        <Image src={'/imgs/logo.png'} fill sizes="100000px" alt="" />
                    </div>
                    <h2 className="font-bold text-[18px]">CHI CỤC THUẾ QUẬN 8</h2>
                </div>
            </div>
        </div>
    );
}
