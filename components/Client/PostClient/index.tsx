'use client';

import SkeletonLoading from '@/components/Common/SkeletonLoading';
import SnackbarMessage from '@/components/Common/SnackbarMessage';
import { getNameFile } from '@/functions/getNameFile';
import { getNameFiles } from '@/functions/getNameFiles';
import { loadingApi } from '@/functions/loadingApi';
import { serverBackend } from '@/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';

export default function PostClient({ postId }: { postId: any }) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        increaseView();
        getPost();
    }, []);

    const getPost = loadingApi(async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post/${postId}`);
            if (result.data.message === 'success') {
                setPost(result.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    }, setLoading);

    const increaseView = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/increase-views/${postId}`);
        } catch (err: any) {
            console.log(err);
        }
    };

    return loading ? (
        <SkeletonLoading h={400} />
    ) : (
        <>
            {post && (
                <div className="flex flex-col font-roboto gap-3 py-4">
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
                    {post.file !== null && (
                        <div className="flex gap-2 items-center">
                            <span className="flex items-center gap-1">
                                <GrAttachment fontSize={16} />
                                Tệp đính kèm:
                            </span>
                            {post.file.split(',').map((file: any, index: number) => (
                                <span className="cursor-pointer flex gap-1 items-center" key={index}>
                                    <BsFileEarmarkText fontSize={16} />
                                    {getNameFile(file)}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {!post && <span>Bài đăng không tồn tại</span>}
        </>
    );
}
