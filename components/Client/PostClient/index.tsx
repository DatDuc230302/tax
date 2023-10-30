'use client';

import { serverBackend } from '@/server';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function PostClient({ postId }: { postId: any }) {
    const [post, setPost] = useState<object[]>([]);
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

    return <div>{postId}</div>;
}
