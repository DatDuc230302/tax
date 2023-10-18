'use client';

import { serverBackend } from '@/server';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<any>({});

    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post/${params.slug}`);
            console.log(result);
            if (result.data.message === 'success') {
                setPost(result.data.post);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full flex justify-center mt-5">
            <div className="w-[1200px] flex flex-col gap-3y gap-3">
                <h1 className="text-[26px] font-merriweather">{post.title}</h1>
                <div className="flex">Ngày ban hành: {post.Issuance_date}</div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className="w-full justify-center">
                    <div className="flex relative w-[400px] overflow-hidden h-[400px]">
                        <Image
                            src={
                                'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202308/Images/infographic-cv-2749-20230801030536-e.jpeg'
                            }
                            alt=""
                            fill
                            sizes="1000000px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
