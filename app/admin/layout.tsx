'use client';

import NoneRole from '@/componentsAdmin/NoneRole';
import { serverBackend } from '@/server';
import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import NavAdmin from '@/componentsAdmin/NavAdmin';
import CurrentUser from '@/componentsAdmin/CurrentUser';

interface typeContext {
    id: string;
    name: string;
    role: string;
}

export const AdminContext = createContext<typeContext>({
    id: '',
    name: '',
    role: '',
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [idUser, setIdUser] = useState<string>('');
    const [nameUser, setNameUser] = useState<string>('');
    const [roleUser, setRoleUser] = useState<string>('');

    // Truyền dữ liệu thông qua đây
    const dataContext = { id: idUser, name: nameUser, role: roleUser };

    useEffect(() => {
        document.title = 'Trang quản trị';
        const currentUser: any = JSON.parse(`${sessionStorage.getItem('currentUser')}`);
        const id: string = currentUser && currentUser.id ? currentUser.id : '0';
        const name: string = currentUser && currentUser.name ? currentUser.name : 'Anonymous';
        const role: string = currentUser && currentUser.role ? currentUser.role : 'default';
        setIdUser(String(id));
        setNameUser(String(name));
        setRoleUser(String(role));
    }, []);

    const renderUI = () => {
        if (roleUser.length > 0) {
            if (roleUser === 'admin' || roleUser === 'root') {
                return (
                    <AdminContext.Provider value={dataContext}>
                        <div className="flex h-full">
                            <div className="flex w-full flex-col">
                                <div className="justify-between px-4 flex bg-[#3077D9] w-full h-[70px]">
                                    <NavAdmin />
                                    <CurrentUser />
                                </div>
                                <div className="flex">{children}</div>
                            </div>
                        </div>
                    </AdminContext.Provider>
                );
            } else {
                return <NoneRole />;
            }
        }
    };

    return renderUI();
}
