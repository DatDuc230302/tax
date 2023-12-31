'use client';

import { ClientContext } from '@/app/(client)/layout';
import Link from 'next/link';
import React, { useContext } from 'react';

export default function Videos() {
    const list: any = [
        {
            title: 'LANDSHOW#18: Đối thoại về sửa đổi luật đất đai | VTV24',
            src: 'https://www.youtube.com/embed/RG6-W2mfwBY',
        },
        {
            title: 'Tràn lan người đi bộ vi phạm luật giao thông | VTV24',
            src: 'https://www.youtube.com/embed/tsuN-2eOGqM',
        },
        {
            title: '05 Chính Sách, Quy Định Về Thuế, Hóa Đơn Đầu Năm 2023 | THƯ VIỆN PHÁP LUẬT',
            src: 'https://www.youtube.com/embed/uLnk1PoiHso',
        },
        {
            title: 'Chống lợi ích nhóm trong xây dựng pháp luật | VTV24',
            src: 'https://www.youtube.com/embed/X7T6fXfUXBo',
        },
    ];

    const dataContext: any = useContext(ClientContext);
    const videos: any = dataContext.posts.filter((item: any) => item.parent_name === 'Video');

    return (
        <div className="flex justify-center py-6 px-4 font-merriweather min-h-[350px]">
            <div className="flex flex-col bg-white w-wMain h-max">
                <div className="flex items-center justify-between border-b-[2px] boder-[#ccc]">
                    <h2 className="text-[26px]">Thư viện video</h2>
                    <Link
                        href="/bai-dang?category=video"
                        className="hover:text-colorLink duration-150 text-[13px] ease-linear cursor-pointer"
                    >
                        Xem thêm
                    </Link>
                </div>
                <div className="flex lg:flex-row flex-col w-full gap-3 mt-3">
                    <div className="flex justify-center flex-wrap lg:flex-nowrap gap-3">
                        {videos.map(
                            (item: any, index: number) =>
                                index < 4 && (
                                    <div key={index} className="w-[45%] lg:w-[25%] flex flex-col gap-2">
                                        <iframe
                                            className="select-none"
                                            allowFullScreen={true}
                                            width="100%"
                                            height="150"
                                            src={`https://www.youtube.com/embed/${item.content}?si=fo9sSxzqp_r6LJ2z`}
                                        ></iframe>
                                        <span className="text-[#505050] line-clamp-2 text-[13px]">
                                            {item.short_desc}
                                        </span>
                                    </div>
                                ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
