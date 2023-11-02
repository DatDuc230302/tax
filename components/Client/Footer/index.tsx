'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function Footer() {
    const [settingData, setSettingData] = useState<any>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('settingData');
        if (storedData) {
            setSettingData(JSON.parse(storedData));
        } else {
            getFooter();
        }
    }, []);

    const getFooter = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/ReadSetting`);
            setSettingData(result.data);
            localStorage.setItem('settingData', JSON.stringify(result.data));
        } catch (err) {}
    };
    return (
        <div className="w-full flex justify-center bg-[#0B80FF] p-4 min-h-[200px]">
            {settingData ? (
                <div className="flex w-wMain flex-col lg:flex-row justify-between text-white">
                    <div className="flex h-[60px] gap-2 items-center">
                        <div className="w-[60px] h-[60px] relative">
                            <Image src={'/imgs/logo.png'} fill sizes="100000px" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-[18px]">CỤC THUẾ THÀNH PHỐ HỒ CHÍ MINH</h3>
                            <h3 className="font-bold text-[18px]">{settingData.footer_owner}</h3>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h2 className="font-bold text-[18px] h-[60px] items-center flex">
                            Trang thông tin Chi Cục Thuế Quận 8
                        </h2>
                        <div className="flex flex-col text-[14px]">
                            <span>Địa chỉ: {settingData.footer_address}</span>
                            <span>Điện thoại: {settingData.footer_phone}. Fax: (028) 38 501 032</span>
                            <span>Thời gian làm việc: {settingData.footer_working_hours}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <h2 className="font-bold text-[18px] h-[60px] items-center flex">
                            Kết nối Chi Cục Thuế Quận 8
                        </h2>
                        <div className="flex flex-col text-[14px]">
                            <span>© Bản quyền 2022 - Chi Cục Thuế Quận 8</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-white">Đang tải...</div>
            )}
        </div>
    );
}
