'use client';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { IoEllipsisVertical } from 'react-icons/io5';
import css from './ChatBot.module.scss';
import { BsRobot, BsTelephoneFill } from 'react-icons/bs';
import { formatTime } from '@/functions/formatTime';
import { getTime } from '@/functions/getTime';
import echo from '@/laravel-echo-config';
import axios from 'axios';
import { serverBackend } from '@/server';

interface typeQuestions {
    content: string;
    sender_type: string;
    created_at: string;
}

export default function ChatBot() {
    const [turn, setTurn] = useState<boolean>(false);
    const [turnBox, setTurnBox] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>('');
    // const [questions, setQuestions] = useState<typeQuestions[]>([
    //     { question: 'Bạn cần hỗ trợ gì ?', type: 'bot', time: getTime() },
    // ]);
    const [messages, setMessages] = useState<typeQuestions[]>([]);
    const [boxQuestions, setBoxQuestion] = useState<string[]>(['Đóng tiền diện', 'Đóng thuế']);

    // useEffect(() => {
    //     let token = getCookie('guest_token');
    //     const channel = echo.channel('laravel_database_chat' + token);

    //     channel.listen('ChatEvent', function (data: any) {
    //         setMessages((prevMessages) => [
    //             ...prevMessages,
    //             {
    //                 content: data['content'],
    //                 sender_type: data['sender_type'],
    //                 created_at: moment(data['created_at']).format('DD/MM/YYYY HH:mm:ss'),
    //             },
    //         ]);
    //         setValueInput('');
    //     });

    //     return () => {
    //         channel.stopListening('ChatEvent');
    //     };
    // }, []);

    // useEffect(() => {
    //     const fetchMessages = async () => {
    //         try {
    //             let token = getCookie('guest_token');
    //             const response = await axios.get(`http://localhost:8000/api/v1/guest-get-message/${token}`);
    //             setMessages(response.data.data);
    //         } catch (error) {
    //             console.error('Error fetching messages:', error);
    //         }
    //     };
    //     fetchMessages();
    // }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                let token = getCookie('guest_token');
                const response = await axios.get(`${serverBackend}/api/v1/guest-get-message/${token}`);
                setMessages(response.data.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, []);

    const handleOnchange = (value: string) => {
        value[0] !== ' ' && setValueInput(value);
    };
    const handleSend = async () => {
        let guestToken = getCookie('guest_token');
        if (!guestToken) {
            guestToken = generateUniqueToken();
            document.cookie = `guest_token=${guestToken}; expires=${new Date(
                new Date().getTime() + 24 * 60 * 60 * 1000,
            ).toUTCString()}; path=/`;
        }
        if (valueInput.length > 0) {
            try {
                const formData: any = new FormData();
                formData.append('content', valueInput);
                formData.append('guest_token', guestToken);
                const response = await axios.post(`${serverBackend}/api/v1/send-message-to-admin`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    // setMessages([...messages, { content: valueInput, sender_type: 'customer', created_at: moment(getTime()).format('DD/MM/YYYY HH:mm:ss')}]);
                    // setValueInput('');
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop();
            if (cookieValue) {
                return cookieValue.split(';').shift();
            }
        }
        return undefined;
    };
    const generateUniqueToken = () => {
        const timestamp = new Date().getTime().toString(); // Lấy thời gian hiện tại dưới dạng số
        const randomStr = Math.random().toString().substring(2, 10); // Chuỗi số ngẫu nhiên từ Math.random()

        return `${timestamp}${randomStr}`.substring(0, 17);
    };
    const onKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const onChoose = (value: string) => {
        // setQuestions([...questions, { question: value, type: 'user', time: getTime() }]);
        // setValueInput('');
    };

    const handleCall = () => {
        window.location.href = 'tel:+84962862925';
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
                <div className="select-none shrink-0 h-[50px] px-4 items-center justify-between flex border-b-[1px] border-[#ccc]">
                    <i onClick={() => handleCall()} className="cursor-pointer">
                        <BsTelephoneFill fontSize={20} />
                    </i>
                    <div className="flex items-center h-full gap-1">
                        <span>Hỏi đáp</span>
                        <div className="bg-[#00c853] w-[10px] h-[10px] rounded-[50%]"></div>
                    </div>
                    <i onClick={() => setTurn(false)} className="cursor-pointer">
                        <AiOutlineClose fontSize={18} />
                    </i>
                </div>
                <div className={`${css.scroll} flex flex-col bg-[#ebeced] p-4 h-full`}>
                    <div className="flex">
                        <div className="flex w-[300px] items-center gap-2">
                            <i className="rounded-[50%] shadow-lg bg-white p-3">
                                <BsRobot fontSize={20} />
                            </i>
                            <span className="flex p-[10px] bg-white shadow-lg flex-col text-[15px] rounded-[8px] my-2">
                                <span className="text-[12px] text-[#476285]">Tôi có thể giúp gì được cho bạn ?</span>
                            </span>
                        </div>
                    </div>
                    <>
                        <div className="flex">
                            <div className="flex w-[300px] items-center gap-2">
                                <span className="flex p-[10px] cursor-pointer  border-[1px] bg-[#00ff00] border-[#00ff00] hover:opacity-40 duration-200 shadow-lg flex-col text-[15px] rounded-[8px] my-2">
                                    <span className="text-[12px] text-[#476285]">Thuế là gì</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex w-[300px] items-center gap-2">
                                <span className="flex p-[10px] cursor-pointer  border-[1px] bg-[#00ff00] border-[#00ff00] hover:opacity-40 duration-200 shadow-lg flex-col text-[15px] rounded-[8px] my-2">
                                    <span className="text-[12px] text-[#476285]">Tài chính là gì ?</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex w-[300px] items-center gap-2">
                                <span className="flex p-[10px] cursor-pointer  border-[1px] bg-[#00ff00] border-[#00ff00] hover:opacity-40 duration-200 shadow-lg flex-col text-[15px] rounded-[8px] my-2">
                                    <span className="text-[12px] text-[#476285]">
                                        Tôi có thể giúp gì được cho bạn ?
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex w-[300px] items-center gap-2">
                                <span className="flex p-[10px] cursor-pointer  border-[1px] bg-[#00ff00] border-[#00ff00] hover:opacity-40 duration-200 shadow-lg flex-col text-[15px] rounded-[8px] my-2">
                                    <span className="text-[12px] text-[#476285]">
                                        Tôi có thể giúp gì được cho bạn ?
                                    </span>
                                </span>
                            </div>
                        </div>
                    </>
                    {messages &&
                        messages.map((item: any, index: number) => (
                            <div key={index}>
                                {item.sender_type === 'customer' && (
                                    <div className="flex justify-end">
                                        <div className="flex w-[300px] justify-end items-end flex-col">
                                            <div
                                                key={index}
                                                className="flex flex-col p-[12px] shadow-lg bg-[#E5EFFF] text-[15px] rounded-[8px] my-2"
                                            >
                                                {item.content}
                                                <span className="text-[12px] text-[#476285]">
                                                    {moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {item.sender_type === 'admin' && (
                                    <div className="flex">
                                        <div className="flex w-[300px] items-center gap-2">
                                            <i className="rounded-[50%] shadow-lg bg-white p-3">
                                                <BsRobot fontSize={20} />
                                            </i>
                                            <span
                                                key={index}
                                                className="flex p-[10px] bg-white shadow-lg flex-col text-[15px] rounded-[8px] my-2"
                                            >
                                                {item.content}
                                                {index !== 0 && (
                                                    <span className="text-[12px] text-[#476285]">
                                                        {moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
                <div className="w-full flex items-center h-[100px] border-t-[1px] border-[#ccc]">
                    <div className="flex px-4 w-full items-center gap-2">
                        <i onClick={() => setTurnBox(!turnBox)} className="cursor-pointer">
                            <IoEllipsisVertical fontSize={20} />
                        </i>
                        <div className="bg-[#dddddd] select-none w-full flex items-center py-2 rounded-[14px] pr-4 ">
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
