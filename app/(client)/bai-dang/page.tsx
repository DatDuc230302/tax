import PostsClient from '@/components/Client/PostsClient';
import { serverBackend } from '@/server';
import React from 'react';

async function getPosts() {
    const result: any = await fetch(`${serverBackend}/api/v1/post`, {
        cache: 'no-cache',
    });
    if (result.ok) {
        return result.json();
    } else {
        return { message: 'Error' };
    }
}

export default async function Page() {
    return (
        <div className="flex justify-center mt-2 font-roboto">
            <div className="flex w-wMain flex-col">
                <PostsClient />
            </div>
        </div>
    );
}
