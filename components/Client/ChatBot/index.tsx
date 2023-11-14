'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Divider, Tooltip, useTable } from '@nextui-org/react';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { IoEllipsisVertical } from 'react-icons/io5';
import css from './ChatBot.module.scss';

interface typeQuestions {
    question: string;
    type: string;
}

export default function ChatBot() {
    const [turn, setTurn] = useState<boolean>(true);
    const [turnBox, setTurnBox] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>('');
    const [questions, setQuestions] = useState<typeQuestions[]>([{ question: 'Bạn cần hỗ trợ gì ?', type: 'bot' }]);
    const [boxQuestions, setBoxQuestion] = useState<string[]>(['Đóng tiền diện', 'Đóng thuế']);

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

    const onChoose = (value: string) => {
        setQuestions([...questions, { question: value, type: 'user' }]);
        setValueInput('');
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
                } flex shadow-2xl z-[1000000000000] font-sansSerif border-[1px] border-[#ccc] duration-100 ease-linear w-full h-full bottom-0 right-0 fixed md:h-[512px] md:w-[410px] md:bottom-4 md:right-4 rounded-[14px] flex-col bg-white`}
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
                <div className={`${css.scroll} flex flex-col p-4 h-full`}>
                    {questions.map((item: typeQuestions, index: number) => (
                        <>
                            {item.type === 'bot' && (
                                <div className="flex">
                                    <div className="flex w-[300px]">
                                        <span
                                            key={index}
                                            className="flex p-[10px] bg-[#E5EFFF] text-[15px] rounded-[8px] my-2"
                                        >
                                            {item.question}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {item.type === 'user' && (
                                <div className="flex justify-end">
                                    <div className="flex w-[300px] justify-end">
                                        <span
                                            key={index}
                                            className="flex p-[10px] bg-[#E5EFFF] text-[15px] rounded-[8px] my-2"
                                        >
                                            {item.question}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </div>
                <div className="w-full flex items-center h-[100px] border-t-[1px] border-[#ccc]">
                    <div className="flex px-4 w-full items-center gap-2">
                        <i onClick={() => setTurnBox(!turnBox)} className="cursor-pointer">
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
                <div
                    className={`${
                        turnBox ? 'visible opacity-100' : 'invisible opacity-0'
                    } flex duration-100 ease-linear absolute w-[300px] flex-col text-[14px] h-max border-[1px] border-[#ccc] rounded-[8px] bg-white left-4 bottom-[72px] py-2`}
                >
                    {boxQuestions.map((item: any, index: number) => (
                        <span
                            onClick={() => {
                                onChoose(item);
                                setTurnBox(false);
                            }}
                            className="py-1 duration-100 ease-linear hover:bg-[#e2e2e2] px-2  cursor-pointer"
                            key={index}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
