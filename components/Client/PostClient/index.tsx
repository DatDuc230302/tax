'use client';

import SkeletonLoading from '@/components/Common/SkeletonLoading';
import SnackbarMessage from '@/components/Common/SnackbarMessage';
import { loadingApi } from '@/functions/loadingApi';
import { serverBackend } from '@/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';

export default function PostClient({ postId }: { postId: any }) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [networkError, setNetworkError] = useState<boolean>(false);
    useEffect(() => {
        getPost();
    }, []);

    const getPost = loadingApi(async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post/${postId}`);
            if (result.data.message === 'success') {
                setPost(result.data.data);
            }
        } catch (err: any) {
            if (err.message === 'Network Error') {
                setNetworkError(true);
            }
            if (err.response.data.message === 'error') {
                setNotFound(true);
            }
        }
    }, setLoading);

    return loading ? (
        <SkeletonLoading h={400} />
    ) : (
        <>
            {networkError && <SnackbarMessage title="Không thể kết nối đến máy chủ" type={4} />}
            {notFound && <SnackbarMessage title="Không tìm thấy bài đăng" type={2} />}
            {post && (
                <div className="flex flex-col font-roboto gap-3">
                    <h2 className="font-bold text-[26px]">{post.title}</h2>
                    <div className="flex items-center gap-2">
                        <span>
                            <b>Ngày ban hành:</b> {post.Issuance_date}
                        </span>
                        <span>
                            <b>Số hiệu:</b> {post.serial_number}
                        </span>
                    </div>
                    <h2 dangerouslySetInnerHTML={{ __html: post.content }}></h2>
                    <div className="flex gap-2 items-center">
                        <span className="flex items-center gap-1">
                            <GrAttachment fontSize={16} />
                            Tệp đính kèm:
                        </span>
                        {post.file.split(',').map((file: any, index: number) => (
                            <span className="cursor-pointer flex gap-1 items-center" key={index}>
                                <BsFileEarmarkText fontSize={16} />
                                {file}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {!post && <span>Bài đăng không tồn tại</span>}
        </>
    );
}
