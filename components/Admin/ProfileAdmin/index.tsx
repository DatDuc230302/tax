'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AdminContext } from '@/app/admin/layout';
import { MdSecurity } from 'react-icons/md';
import { Chip } from '@nextui-org/react';
import UpdateProfile from '../UpdateProfile';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function ProfileAdmin() {
    const dataContext: any = useContext(AdminContext);
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        document.title = 'Hồ sơ cá nhân';
    }, []);

    const getUser = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/user/${dataContext.id}`);
            setUser(res.data.data);
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div className="flex w-full mt-4 justify-center px-10">
            {user && (
                <div className="w-full flex-col lg:flex-row flex gap-4">
                    <div className="border-[1px] shrink-0 rounded-[10px] shadow-xl border-[#ccc] w-full lg:w-[320px] h-[350px] p-4 flex justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="border-[1px] relative border-[#ccc] rounded-[50%] h-[200px] w-[200px]">
                                <div className="absolute bottom-4 w-full flex justify-center">
                                    <MdSecurity fontSize={50} />
                                </div>
                            </div>
                            <span>{user.name}</span>
                            {user.role === 'root' && <Chip color="danger">Quản trị viên</Chip>}
                            {user.role === 'admin' && <Chip color="primary">Người quản lý</Chip>}
                        </div>
                    </div>
                    <div className="border-[1px] flex-col shadow-2xl rounded-[10px] gap-3 border-[#ccc] w-full h-[350px] p-4 flex">
                        <h2 className="text-[26px] flex font-bold gap-4 items-center">
                            Thông tin hồ sơ
                            <UpdateProfile user={user} />
                        </h2>
                        <div className="flex gap-2">
                            <span className="font-bold">Họ và tên:</span>
                            <span>{user.name}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold">Email:</span>
                            <span>{user.email}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold">Số điện thoại:</span>
                            <span>{user.phone}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold">Bài đăng:</span>
                            <span>0</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold">Tham gia ngày:</span>
                            <span>15/05/2022</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Mật khẩu:</span>
                            <span>***********</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
