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
                    <h2 className="font-bold text-[18px]">CHI CỤC THUẾ QUẬN 8</h2>
                </div>
                <div className="flex gap-2 flex-col">
                    <h2 className="font-bold text-[18px] h-[60px] items-center flex">
                        Trang thông tin chi cục thuế quận 8
                    </h2>
                    <div className="flex flex-col text-[14px]">
                        <span>Địa chỉ: 63 Vũ Tông Phan, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh</span>
                        <span>Điện thoại: (028) 37 702288. Fax: (028) 37 702288</span>
                        <span>Thời gian làm việc: Từ thứ 2 đến thứ 6, thứ 7 làm việc buổi sáng</span>
                        <span>- Sáng: từ 08g00 đến 12g00</span>
                        <span>- Chiều: từ 13g00 đến 17g00</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-col">
                    <h2 className="font-bold text-[18px] h-[60px] items-center flex">Kết nối chi cục thuế quận 8</h2>
                    <div className="flex flex-col text-[14px]">
                        <span>© Bản quyền 2022 - Chi cục Thuế Quận 8</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
