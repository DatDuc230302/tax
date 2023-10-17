'use client';

import { formatTime } from '@/functions/formatTime';
import { serverBackend } from '@/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';

export default function Page({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<any>({});

    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        const result = await axios.get(`${serverBackend}/api/v1/post/${params.slug}`);
        if (result.data.message === 'success') {
            setPost(result.data.post);
        }
    };
    return (
        <div className="flex flex-col gap-2 mt-2">
            <h2 className="text-[26px]">{post.title}</h2>
            <span className="flex items-center gap-2 border-b-[1px] border-[#ccc] pb-2">
                <BiTimeFive />
                {post.Issuance_date}
            </span>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}
