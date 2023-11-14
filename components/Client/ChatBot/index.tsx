'use client';

import React, { useState } from 'react';
import { Divider, Tooltip } from '@nextui-org/react';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { IoEllipsisVertical } from 'react-icons/io5';

interface typeQuestions {
    question: string;
    type: string;
}

export default function ChatBot() {
    const [turn, setTurn] = useState<boolean>(true);
    const [valueInput, setValueInput] = useState<string>('');
    const [questions, setQuestions] = useState<typeQuestions[]>([{ question: 'Bạn cần hỗ trợ gì ?', type: 'bot' }]);

    const handleOnchange = (value: string) => {
        value[0] !== ' ' && setValueInput(value);
    };

    const handleSend = () => {
        if (valueInput.length > 0) {
            setQuestions([...questions, { question: valueInput, type: 'user' }]);
            setValueInput('');
        }
    };

    const onKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            <Tooltip content="Đặt câu hỏi">
                <div
                    onClick={() => setTurn(true)}
                    className="duration-200 ease-linear hover:bg-opacity-60 fixed bg-[#0B80FF] bottom-[40px] cursor-pointer p-3 rounded-[50%] right-[30px] lg:right-[70px]"
                >
                    <TbMessageCircle2Filled fontSize={32} color="white" />
                </div>
            </Tooltip>
            <div
                className={`${
                    turn ? 'visible opacity-100' : 'invisible opacity-0'
                } h-[512px] flex shadow-2xl z-[1000000000000] border-[1px] border-[#ccc] duration-100 ease-linear w-[250px] fixed lg:w-[410px] bottom-4 right-4 rounded-[14px] flex-col bg-white`}
            >
                <div className="shrink-0 h-[50px] px-4 items-center justify-between flex border-b-[1px] border-[#ccc]">
                    <div></div>
                    <div className="flex items-center h-full gap-1">
                        <span>Hỏi đáp</span>
                        <div className="bg-[#00c853] w-[10px] h-[10px] rounded-[50%]"></div>
                    </div>
                    <i onClick={() => setTurn(false)} className="cursor-pointer">
                        <AiOutlineClose fontSize={18} />
                    </i>
                </div>
                <div className="flex flex-col justify-between h-full pb-4 font-sansSerif">
                    <div className="flex flex-col p-4 h-full overflow-y-auto">
                        {questions.map((item: typeQuestions, index: number) => (
                            <>
                                {item.type === 'bot' && (
                                    <div className="flex">
                                        <span
                                            key={index}
                                            className="flex max-w-[300px] break-words p-[10px] bg-[#E5EFFF] text-[15px] rounded-[8px] my-2"
                                        >
                                            {item.question}
                                        </span>
                                    </div>
                                )}
                                {item.type === 'user' && (
                                    <div className="flex justify-end">
                                        <span
                                            key={index}
                                            className="flex w-[300px] break-words p-[10px] bg-[#E5EFFF] text-[15px] rounded-[8px] my-2"
                                        >
                                            {item.question}
                                        </span>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <Divider />
                        <div className="flex px-4 items-center gap-2">
                            <i className="cursor-pointer">
                                <IoEllipsisVertical fontSize={20} />
                            </i>
                            <div className="bg-[#dddddd] w-full flex items-center py-2 rounded-[14px] pr-4 ">
                                <input
                                    onChange={(e) => handleOnchange(e.target.value)}
                                    className="bg-transparent w-full outline-none min-h-[10px] px-4"
                                    placeholder="Đặt câu hỏi.."
                                    onKeyDown={(e) => onKeyDown(e)}
                                    value={valueInput}
                                />
                                <i
                                    onClick={() => handleSend()}
                                    className="select-none flex cursor-pointer font-sansSerif text-[#4d7cff]"
                                >
                                    <FiSend fontSize={20} />
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
