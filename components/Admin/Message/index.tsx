'use client';

import { decrypt } from '@/functions/crypto';
import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import moment from 'moment';
import { IoArrowBackSharp, IoEllipsisVerticalSharp } from 'react-icons/io5';
import echo from '@/laravel-echo-config';
import { AdminContext } from '@/app/admin/layout';
export default function Message() {
    const [customers, setCustomers] = useState<number[]>([1, 2, 3, 5, 6, 7, 8]);
    const [selectedUserId, setSelectedUserId] = useState<any>(null);
    const [allMessages, setAllMessages] = useState<any>([
        { content: 'Tôi muốn hỏi', sender_type: 'customer', created_at: '12/10/2022' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const dataContext = useContext(AdminContext);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/admin-get-message');
                console.log(response);
                setCustomers((prevCustomers) => [...prevCustomers, ...response.data.customer_tokens]);
                setAllMessages(response.data.customer_messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, []);
    // useEffect(() => {
    //     const subscribeToChat = () => {
    //         if (selectedUserId) {
    //             const channel = echo.channel('laravel_database_chat' + selectedUserId);

    //             channel.listen('ChatEvent', function (data: any) {
    //                 setAllMessages((prevMessages) => [
    //                     ...prevMessages,
    //                     {
    //                         content: data['content'],
    //                         sender_type: data['sender_type'],
    //                         created_at: moment(data['created_at']).format('DD/MM/YYYY HH:mm:ss'),
    //                     },
    //                 ]);
    //                 setNewMessage('');
    //             });

    //             return () => {
    //                 channel.stopListening('ChatEvent');
    //             };
    //         }
    //     };

    //     subscribeToChat(); // Gọi hàm subscribe khi selectedUserId thay đổi
    // }, [selectedUserId]); // Thêm selectedUserId vào dependency để lắng nghe sự thay đổi

    const sendMessage = async () => {
        try {
            if (newMessage.length > 0) {
                // const headers = {
                //     'Content-Type': 'application/json',
                //     Authorization: `Bearer ${dataContext.token}`, // Gửi token trong header
                // };
                // const requestData = {
                //     guest_token: selectedUserId,
                //     content: newMessage,
                // };
                // const response = await axios.post('http://localhost:8000/api/v1/reply-message-to-guest', requestData, {
                //     headers,
                // });
                // if (response.data.success) {
                //     console.log('Tin nhắn đã được gửi thành công!');
                // }
                setAllMessages([
                    ...allMessages,
                    { content: newMessage, sender_type: 'admin', created_at: '12/10/2022' },
                ]);
                setNewMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleUserClick = async (userId: any) => {
        try {
            // const response = await axios.get(`http://localhost:8000/api/v1/guest-get-message/${userId}`);
            // setAllMessages(response.data.data);
            setSelectedUserId(userId);
            console.log(userId);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="flex w-full h-full p-4">
            <div className="w-full h-[600px] flex lg:flex-row flex-col border-[1px] border-[#c4c4c4]">
                <div className={`hidden lg:flex shrink-0 flex-col w-[100%] lg:w-[40%] border-[1px] border-r-[#c4c4c4]`}>
                    <div className="flex px-4 py-2 border-[1px] border-b-[#c4c4c4] justify-between">
                        <h2 className="shrink-0 font-bold text-[24px] text-[#05728F]">Hỏi Đáp</h2>
                    </div>
                    <div className="flex flex-col h-[540px] overflow-y-auto">
                        {customers.map((item: any) => (
                            <div
                                key={item}
                                className={`flex gap-2 last:border-b-[0] px-4 py-4 items-center cursor-pointer border-b-[1px] border-b-[#c4c4c4] hover:bg-[#e4e4e4] duration-100 ease-linear ${
                                    selectedUserId === item ? 'active_chat' : ''
                                }`}
                                onClick={() => handleUserClick(item)}
                            >
                                <div className="relative w-[56px] h-[50px]">
                                    <Image
                                        src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/lmht-darius-duong-tren.jpg"
                                        alt=""
                                        fill
                                        sizes="10000px"
                                        className="object-cover rounded-[50%]"
                                    />
                                </div>
                                <div className="flex w-full flex-col justify-between">
                                    <div className="flex w-full justify-between">
                                        <span className="text-[14px] font-bold">{`user: ${item}`}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Khi selectUserid null thì hiện */}
                {!selectedUserId && (
                    <div
                        className={`flex lg:hidden shrink-0 flex-col w-[100%] lg:w-[40%] border-[1px] border-r-[#c4c4c4]`}
                    >
                        <div className="flex px-4 py-2 border-[1px] border-b-[#c4c4c4] justify-between">
                            <h2 className="shrink-0 font-bold text-[24px] text-[#05728F]">Hỏi Đáp</h2>
                        </div>
                        <div className="flex flex-col h-[540px] overflow-y-auto">
                            {customers.map((item: any) => (
                                <div
                                    key={item}
                                    className={`flex gap-2 last:border-b-[0] px-4 py-4 items-center cursor-pointer border-b-[1px] border-b-[#c4c4c4] hover:bg-[#e4e4e4] duration-100 ease-linear ${
                                        selectedUserId === item ? 'active_chat' : ''
                                    }`}
                                    onClick={() => handleUserClick(item)}
                                >
                                    <div className="relative w-[56px] h-[50px]">
                                        <Image
                                            src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/lmht-darius-duong-tren.jpg"
                                            alt=""
                                            fill
                                            sizes="10000px"
                                            className="object-cover rounded-[50%]"
                                        />
                                    </div>
                                    <div className="flex w-full flex-col justify-between">
                                        <div className="flex w-full justify-between">
                                            <span className="text-[14px] font-bold">{`user: ${item}`}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedUserId && (
                    <div className="flex flex-col h-full w-full">
                        <div className="flex px-4 items-center py-[8.5px] border-[1px] border-b-[#c4c4c4] justify-between">
                            <div className="flex items-center gap-2">
                                <i onClick={() => setSelectedUserId(null)} className="cursor-pointer">
                                    <IoArrowBackSharp fontSize={24} />
                                </i>
                                <h2 className="shrink-0 font-bold text-[24px] text-[#05728F]">Tin nhắn</h2>
                            </div>
                            <i className="cursor-pointer">
                                <IoEllipsisVerticalSharp fontSize={24} />
                            </i>
                        </div>
                        <div className="flex flex-col h-full bg-[#e0e0e0] overflow-y-auto">
                            {allMessages.map((message: any) => (
                                <div key={message.id}>
                                    {message.sender_type === 'customer' ? (
                                        <div className="flex gap-3 px-4 py-4 items-center">
                                            <div className="relative w-[60px] h-[60px]">
                                                <Image
                                                    src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/lmht-darius-duong-tren.jpg"
                                                    alt=""
                                                    className="object-cover rounded-[50%]"
                                                    fill
                                                    sizes="1000000px"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="flex bg-white shadow-2xl rounded-[16px] p-2">
                                                    {message.content}
                                                </p>
                                                <span className="text-[12px] flex justify-end">
                                                    {message.created_at}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2 flex justify-end">
                                            <div className="flex flex-col gap-2">
                                                <span className="shadow-2xl bg-[#E5EFFF] p-2 rounded-[16px]">
                                                    {message.content}
                                                </span>
                                                <span className="text-[12px] flex justify-end">
                                                    {message.created_at}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="border-t-[1px] items-center px-4 border-t-[#c4c4c4] h-[50px] w-full flex">
                            <input
                                className="w-full bg-transparent py-4"
                                placeholder="Nhập tin nhắn"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendMessage();
                                    }
                                }}
                            />
                            <i className="cursor-pointer" onClick={sendMessage}>
                                <IoMdSend color={'#0B80FF'} fontSize={30} />
                            </i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
