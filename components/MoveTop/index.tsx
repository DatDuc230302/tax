'use client';

import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

export default function MoveTop() {
    const [turn, setTurn] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            setHeight(window.scrollY);
            if (height > 500) {
                setTurn(true);
            } else {
                setTurn(false);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [height]);

    return (
        <div
            onClick={() => window.scrollTo(0, 0)}
            className={`${
                turn ? 'flex' : 'hidden'
            } fixed bottom-[50px] cursor-pointer bg-red-100 duration-150 ease-linear right-[80px] w-[50px] h-[50px] items-center justify-center flex-col rounded-[50%] border-[1px] border-[#ccc] p-2`}
        >
            <IoIosArrowUp color="red" fontSize={30} />
            <IoIosArrowUp color="red" fontSize={30} />
        </div>
    );
}
