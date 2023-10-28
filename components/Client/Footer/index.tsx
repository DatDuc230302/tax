import Image from 'next/image';
import React from 'react';

export default function Footer() {
    return (
        <div className="w-full flex justify-center bg-[#0B80FF] p-4">
            <div className="flex w-[1200px] flex-col lg:flex-row justify-between text-white">
                <div className="flex h-[60px] gap-2 items-center">
                    <div className="w-[60px] h-[60px] relative">
                        <Image src={'/imgs/logo.png'} fill sizes="100000px" alt="" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-[18px]">CỤC THUẾ TP. HỒ CHÍ MINH</h3>
                        <h3 className="font-bold text-[18px]">CHI CỤC THUẾ QUẬN 8</h3>
                    </div>
                </div>
                <div className="flex gap-2 flex-col">
                    <h2 className="font-bold text-[18px] h-[60px] items-center flex">
                        Trang thông tin Chi Cục Thuế Quận 8
                    </h2>
                    <div className="flex flex-col text-[14px]">
                        <span>Địa chỉ: Số 1079 Phạm Thế Hiển, Phường 5, Quận 8, TP Hồ Chí Minh</span>
                        <span>Điện thoại: (028) 38 501 032. Fax: (028) 38 501 032</span>
                        <span>Thời gian làm việc: Từ thứ 2 đến thứ 6, thứ 7 làm việc buổi sáng</span>
                        <span>- Sáng: từ 07:30 đến 11:30</span>
                        <span>- Chiều: từ 13g00 đến 17g00</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-col">
                    <h2 className="font-bold text-[18px] h-[60px] items-center flex">Kết nối Chi Cục Thuế Quận 8</h2>
                    <div className="flex flex-col text-[14px]">
                        <span>© Bản quyền 2022 - Chi Cục Thuế Quận 8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
