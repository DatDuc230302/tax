'use client';

import { loadingApi } from '@/functions/loadingApi';
import { serverBackend } from '@/server';
import { Card, Skeleton } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [post, setPost] = useState<any>({});

    useEffect(() => {
        getPost();
    }, []);

    const getPost = loadingApi(async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post/${params.slug}`);
            console.log(result);
            if (result.data.message === 'success') {
                setPost(result.data.post);
            }
        } catch (err) {
            console.log(err);
        }
    }, setLoading);

    return (
        <div className="flex justify-center h-[100vh] my-4">
            {loading ? (
                <div className="flex w-[1200px]">
                    <Card className="w-full space-y-5 p-4" radius="lg">
                        <Skeleton className="rounded-lg h-[300px]">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 h-[20px] rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 h-[20px]  rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 h-[20px]  rounded-lg">
                                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="w-full flex justify-center mt-5">
                    <div className="w-[1200px] flex flex-col gap-3y gap-3">
                        <h1 className="text-[26px] font-merriweather">{post.title}</h1>
                        <div className="flex">Ngày ban hành: {post.Issuance_date}</div>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        <div className="w-full justify-center"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
