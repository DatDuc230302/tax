import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Video() {
    const arr = [1, 2, 3, 4];
    return (
        <div className="flex justify-center py-6">
            <div className="bg-white w-[1200px] h-max">
                <div className="py-4 flex justify-between border-b-[2px] boder-[#ccc]">
                    <h2 className="font-bold">THƯ VIỆN VIDEO</h2>
                    <div className="flex h-full items-center gap-2">
                        <i className="cursor-pointer text-[#ccc] hover:text-black duration-200 ease-linear">
                            <FiChevronLeft fontSize={22} />
                        </i>
                        <i className="cursor-pointer text-[#ccc] hover:text-black duration-200 ease-linear">
                            <FiChevronRight fontSize={22} />
                        </i>
                    </div>
                </div>
                <div className="flex gap-5 mt-3">
                    {arr.map((item) => (
                        <div key={item} className="w-[300px] flex flex-col gap-2">
                            <iframe width="300" height="150" src="https://www.youtube.com/embed/N8IdPStv7gk"></iframe>
                            <span className="flex text-center text-[13px]">
                                NTTU Kết Nối _Học thạc sỹ Công nghệ Thông tin để đón đầu thế giới Công nghệ hiện đại
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
