'use client';

import { serverBackend } from '@/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GrAttachment } from 'react-icons/gr';

export default function PostClient({ postId }: { postId: any }) {
    const [post, setPost] = useState<any>({});
    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post/${postId}`);
            if (result.data.message === 'success') {
                setPost(result.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
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
            <div className="flex">
                <span className="flex items-center gap-1">
                    <GrAttachment fontSize={16} />
                    Tệp đính kèm:
                </span>
            </div>
        </div>
    );
}
