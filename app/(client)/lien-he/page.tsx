import React from 'react';
import { BsFillClockFill, BsFillTelephoneFill } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';

export default function Page() {
    return (
        <div className="flex justify-center min-h-[700px]">
            <div className="flex w-[1200px] flex-col gap-4">
                <h2 className="text-[#0B80FF] font-bold text-[25px] mt-2 w-full">Thông tin liên hệ</h2>
                <div className="flex w-full gap-4 flex-col rounded-[16px] bg-[#F6F6F6] p-4">
                    <div className="flex gap-2 items-center">
                        <i>
                            <FaLocationDot fontSize={22} />
                        </i>
                        <span>63 Vũ Tông Phan, phường An Phú, thành phố Thủ Đức, Thành phố Hồ Chí Minh</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <i>
                            <BsFillTelephoneFill fontSize={22} />
                        </i>
                        <span>028.37702288</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <i>
                            <BsFillClockFill fontSize={22} />
                        </i>
                        <span>Từ thứ 2 đến thứ 6, thứ 7 làm việc buổi sáng</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
