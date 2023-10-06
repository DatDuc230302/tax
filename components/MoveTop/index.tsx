'use client';

import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

export default function MoveTop() {
    const [turn, setTurn] = useState<boolean>(false);
    const [heigh, setHeigh] = useState<number>(0);

    useEffect(() => {
        if (heigh > 500) {
            setTurn(true);
        } else {
            setTurn(false);
        }
    }, [heigh]);

    window.addEventListener('scroll', () => setHeigh(window.scrollY));

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
