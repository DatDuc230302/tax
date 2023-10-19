'use client';

import NoneRole from '@/components/Admin/NoneRole';
import NavAdmin from '@/components/Admin/NavAdmin';
import CurrentUser from '@/components/Admin/CurrentUser';
import React, { useEffect, useState, createContext } from 'react';
import { decrypt } from '@/functions/crypto';

interface typeContext {
    id: string;
    name: string;
    role: string;
    token: string;
}

export const AdminContext = createContext<typeContext>({
    id: '',
    name: '',
    role: '',
    token: '',
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [idUser, setIdUser] = useState<string>('');
    const [nameUser, setNameUser] = useState<string>('');
    const [roleUser, setRoleUser] = useState<string>('');
    const [tokenUser, setTokenUser] = useState<string>('');

    // Truyền dữ liệu thông qua đây
    const dataContext = { id: idUser, name: nameUser, role: roleUser, token: tokenUser };

    useEffect(() => {
        document.title = 'Trang quản trị';
        const valueDecrypt: any = sessionStorage.getItem('currentUser');
        const currentUser: any =
            sessionStorage.getItem('currentUser') && JSON.parse(decrypt(valueDecrypt, 'DucDat2303'));
        // const currentUser: any = sessionStorage.getItem('currentUser') && JSON.parse(decrypt(valueDecrypt, 'admindd'));
        const id: string = currentUser && currentUser.id ? currentUser.id : '0';
        const name: string = currentUser && currentUser.name ? currentUser.name : 'Anonymous';
        const role: string = currentUser && currentUser.role ? currentUser.role : 'default';
        const token: string = currentUser && currentUser.token ? currentUser.token : 'Null';
        setIdUser(String(id));
        setNameUser(String(name));
        setRoleUser(String(role));
        setTokenUser(token);
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
