'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverBackend } from '@/server';
import AlertMessage from '@/componentsAdmin/AlertMessage';

export default function page({ params }: { params: { id: string } }) {
    const [alert, setAlert] = useState<boolean>(false);
    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        try {
            const result: any = await axios.get(`${serverBackend}/api/v1/post/${params.id}`);
        } catch (err: any) {
            if (err.response.status === 404) {
                setAlert(true);
            }
        }
    };

    return (
        <div className="w-full px-4 mt-2">
            {alert && <AlertMessage title="Thông báo" content="Không tìm thấy bài đăng này" />}
        </div>
    );
}
