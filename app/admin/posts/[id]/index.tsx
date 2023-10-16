'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverBackend } from '@/server';
import AlertMessage from '@/componentsAdmin/AlertMessage';

export default function DetailPost({ params }: { params: { id: string } }) {
    const [alert, setAlert] = useState<boolean>(false);
    // const [post, setPost] = useState<object[]>([]);
    // useEffect(() => {
    //     getPost();
    // }, [post]);

    // const getPost = async () => {
    //     try {
    //         const result: any = await axios.get(`${serverBackend}/api/v1/post/${params.id}`);
    //         if (result.data.message === 'success') {
    //             setPost(result.data.data);
    //         }
    //     } catch (err: any) {
    //         if (err.response.status === 404) {
    //             setAlert(true);
    //         }
    //     }
    // };

    return (
        <div className="w-full px-4 mt-2">
            {alert && <AlertMessage title="Thông báo" content="Không tìm thấy bài đăng này" />}
        </div>
    );
}
