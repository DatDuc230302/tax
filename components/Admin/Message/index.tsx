'use client';

import { decrypt } from '@/functions/crypto';
import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import moment from 'moment';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import echo from '@/laravel-echo-config';
import { AdminContext } from '@/app/admin/layout';
export default function Message() {
  const [customers, setCustomers] = useState<number[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const dataContext = useContext(AdminContext);
  console.log(dataContext.token);
  useEffect(() => {
    const fetchMessages = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/admin-get-message');
        console.log(response);
        setCustomers(prevCustomers => [...prevCustomers, ...response.data.customer_tokens]);
        setAllMessages(response.data.customer_messages);

      } catch (error) {
        console.error('Error fetching messages:', error);
    }
};
fetchMessages();
  }, []);
useEffect(() => {
  const subscribeToChat = () => {
    if (selectedUserId) {
      const channel = echo.channel('laravel_database_chat' + selectedUserId);

      channel.listen('ChatEvent', function (data: any) {
        setAllMessages((prevMessages) => [
          ...prevMessages,
          {
            content: data['content'],
            sender_type: data['sender_type'],
            created_at: moment(data['created_at']).format('DD/MM/YYYY HH:mm:ss'),
          },
        ]);
        setNewMessage('');
      });

      return () => {
        channel.stopListening('ChatEvent');
      };
    }
  };

  subscribeToChat(); // Gọi hàm subscribe khi selectedUserId thay đổi
}, [selectedUserId]); // Thêm selectedUserId vào dependency để lắng nghe sự thay đổi

const sendMessage = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${dataContext.token}`, // Gửi token trong header
        };

        const requestData = {
            guest_token: selectedUserId,
            content: newMessage,
        };

        const response = await axios.post(
            'http://localhost:8000/api/v1/reply-message-to-guest',
            requestData,
            { headers } 
        );

        if (response.data.success) {
            console.log('Tin nhắn đã được gửi thành công!');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

  const  handleUserClick  =  async (userId:any) => {
       try {
        const response = await axios.get(`http://localhost:8000/api/v1/guest-get-message/${userId}`)
        setAllMessages(response.data.data);
        setSelectedUserId(userId);
        console.log(allMessages); 

       } catch (error) {
        console.error('Error fetching messages:', error);
    }
  };
  
    return (
        <div className="flex w-full h-full p-4">
        <div className="w-full h-[600px] flex border-[1px] border-[#c4c4c4]">
        <div className="shrink-0 flex flex-col w-[40%] border-[1px] border-r-[#c4c4c4]">
          <div className="flex px-4 py-2 border-[1px] border-b-[#c4c4c4] justify-between">
            <h2 className="shrink-0 font-bold text-[24px] text-[#05728F]">Hỏi Đáp</h2>
          </div>
          <div className="flex flex-col overflow-y-auto">
            {customers.map((item) => (
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
        {selectedUserId && (
        <div className="flex flex-col w-full">
          <div className="flex px-4 items-center py-[8.5px] border-[1px] border-b-[#c4c4c4] justify-between">
            <h2 className="shrink-0 font-bold text-[24px] text-[#05728F]">Tin nhắn</h2>
            <i className="cursor-pointer">
              <IoEllipsisVerticalSharp fontSize={24} />
            </i>
          </div>
          
         <div className="flex flex-col h-full justify-between bg-[#e0e0e0]">
    {allMessages.map((message) => (
        <div key={(message as any).id}>
            {(message as any).sender_type === 'customer' ? (
                <div className="flex gap-3 px-4 py-4 items-center">
                    <div className="relative w-[56px] h-[50px]">
                        <img
                            src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/lmht-darius-duong-tren.jpg"
                            alt=""
                            className="object-cover rounded-[50%]"
                        />
                    </div>
                    <p className="flex bg-white shadow-2xl rounded-[16px] p-2">
                        {(message as any).content}
                    </p>
                </div>
            ) : (
                <div className="px-4 flex justify-end">
                    <span className="shadow-2xl bg-[#E5EFFF] p-2 rounded-[16px]">
                        {(message as any).content}
                    </span>
                </div>
            )}
        </div>
    ))}
      </div>
          <div className="border-t-[1px] items-center px-4 border-t-[#c4c4c4] h-[50px] w-full flex">
          <input
              className="w-full bg-transparent"
              placeholder="Nhập tin nhắn"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
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
