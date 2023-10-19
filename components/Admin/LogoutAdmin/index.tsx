'use client';

import { AdminContext } from '@/app/admin/layout';
import { serverBackend } from '@/server';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

export default function LogoutAdmin({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dataContext = useContext(AdminContext);

    const logout = async () => {
        try {
            const result = await axios.post(
                `${serverBackend}/api/v1/logout`,
                {},
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${dataContext.token}`,
                    },
                },
            );
            if (result.data.status === 'success') {
                sessionStorage.removeItem('currentUser');
                router.push('/login');
            }
        } catch (err: any) {
            if (err.message === 'Network Error') {
                sessionStorage.removeItem('currentUser');
                router.push('/login');
            }
        }
    };
    return <div onClick={() => logout()}>{children}</div>;
}
