'use client';

import React, { useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';

export default function Asking() {
    const [turn, setTurn] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>('');
    return (
        <>
            <Tooltip content="Đặt câu hỏi">
                <div
                    onClick={() => setTurn(true)}
                    className="duration-200 ease-linear hover:bg-opacity-60 fixed bg-[#0B80FF] bottom-[40px] cursor-pointer p-3 rounded-[50%] right-[70px]"
                >
                    <TbMessageCircle2Filled fontSize={32} color="white" />
                </div>
            </Tooltip>
            <div
                className={`${
                    turn ? 'right-0' : 'right-[-320px]'
                } shadow-2xl z-[1000000000000] w-[250px] w duration-250 ease-linear fixed lg:w-[320px] bottom-0 top-0 flex-col flex bg-white`}
            >
                <div className="shrink-0 h-[40px] px-4 items-center justify-between flex border-b-[1px] border-[#ccc]">
                    <i onClick={() => setTurn(false)} className="cursor-pointer">
                        <AiOutlineClose fontSize={18} />
                    </i>
                    <div className="flex items-center h-full gap-1">
                        <span>Hỏi đáp</span>
                        <div className="bg-[#00c853] w-[10px] h-[10px] rounded-[50%]"></div>
                    </div>
                    <div></div>
                </div>
                <div className="flex p-4 flex-col justify-between h-full">
                    <div></div>
                    <div className="w-full bg-[#dddddd] flex items-center px-4 py-2 rounded-[12px] ">
                        <input
                            onChange={(e) => setValueInput(String(e.target.value))}
                            className="bg-transparent pr-1"
                            placeholder="Đặt câu hỏi"
                            type="text"
                        />
                        {valueInput.length > 0 && (
                            <span className="flex cursor-pointer font-sansSerif text-[#4d7cff]">GỬI</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
