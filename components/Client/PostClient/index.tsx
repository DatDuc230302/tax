'use client';

import SkeletonLoading from '@/components/Common/SkeletonLoading';
import SnackbarMessage from '@/components/Common/SnackbarMessage';
import { getNameFile } from '@/functions/getNameFile';
import { getNameFiles } from '@/functions/getNameFiles';
import { loadingApi } from '@/functions/loadingApi';
import { serverBackend } from '@/server';
import axios from 'axios';
import Link from 'next/link';
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
            const res = await axios.get(`${serverBackend}/api/v1/post/${postId}`);
            if (res.data.message === 'success') {
                setPost(res.data.data);
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
        <SkeletonLoading h={700} />
    ) : (
        <>
            {post && post.Issuance_date !== 'Video' && (
                <div className="flex flex-col font-roboto gap-4 py-4 min-h-[700px]">
                    <h2 className="font-bold text-[26px]">{post.title}</h2>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            {post.Issuance_data && (
                                <span>
                                    <b>Ngày ban hành:</b> {post.Issuance_date}
                                </span>
                            )}
                            {post.serial_number && (
                                <span>
                                    <b>Số hiệu:</b> {post.serial_number}
                                </span>
                            )}
                        </div>
                        {post.file !== null && (
                            <div className="flex gap-2 items-center">
                                <span className="flex items-center gap-1">
                                    <GrAttachment fontSize={16} />
                                    Tệp đính kèm:
                                </span>
                                {JSON.parse(post.file).map((file: any, index: number) => (
                                    <Link
                                        href={`${serverBackend}${file}`}
                                        className="cursor-pointer hover:underline flex gap-1 items-center"
                                        key={index}
                                        target="_blank"
                                    >
                                        <BsFileEarmarkText fontSize={16} />
                                        {getNameFile(file)}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <h2 dangerouslySetInnerHTML={{ __html: post.content }}></h2>
                </div>
            )}
            {post && post.Issuance_date === 'Video' && (
                <div className="flex w-full flex-col gap-2 py-4 min-h-[700px]">
                    <iframe
                        className="select-none"
                        allowFullScreen={true}
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${post.content}?si=fo9sSxzqp_r6LJ2z`}
                    ></iframe>
                    <span className="text-[#505050] line-clamp-2 text-[18px]">{post.short_desc}</span>
                </div>
            )}
            {!post && <span>Bài đăng không tồn tại</span>}
        </>
    );
}
