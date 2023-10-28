'use client';
import React, { useEffect, useState } from 'react';
import { getDateVI } from '@/functions/getDateVI';

export default function GetDateTimeVI() {
    const [time, setTime] = useState<string>('');
    const getTime = () => {
        const currentDate = new Date();

        // Lấy giờ hiện tại (24-giờ)
        const currentHour = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours();

        // Lấy phút hiện tại
        const currentMinute = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();

        // Lấy giây hiện tại
        const currentSecond = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds();

        // Hiển thị giờ, phút và giây hiện tại
        return `${currentHour}:${currentMinute}:${currentSecond}`;
    };

    useEffect(() => {
        setTimeout(() => {
            getTime();
            setTime(getTime());
        }, 1000);
    }, [time]);

    return (
        <div className="flex gap-1 font-bold">
            <span className="flex">{getDateVI()}</span>
            <span className="w-[55px]">{time}</span>
        </div>
    );
}
