'use client';

import React, { useState } from 'react';

export default function Video() {
    const arr = [1, 2, 3, 4];
    const [content, setContent] = useState<string>('');

    return (
        <div className="flex justify-center py-6 px-4">
            <div className="flex flex-col bg-white w-[1200px] h-max">
                <div className="py-4 flex justify-between border-b-[2px] boder-[#ccc]">
                    <h2 className="font-bold">THƯ VIỆN VIDEO</h2>
                    <span>Xem thêmcls</span>
                </div>
                <div className="flex w-full gap-3 mt-3">
                    {arr.map((item) => (
                        <div key={item} className="w-[292px] flex flex-col gap-2">
                            <iframe
                                className="select-none"
                                allowFullScreen={true}
                                width="291"
                                height="150"
                                src="https://www.youtube.com/embed/N8IdPStv7gk"
                            ></iframe>
                            <span className="flex justify-center w-full text-center text-[13px]">
                                NTTU Kết Nối _Học thạc sỹ Công nghệ Thông tin để đón đầu thế giới Công nghệ hiện đại
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
