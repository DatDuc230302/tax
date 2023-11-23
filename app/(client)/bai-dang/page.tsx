import PostsClient from '@/components/Client/PostsClient';
import { serverBackend } from '@/server';
import React from 'react';

async function getPosts() {
    const result: any = await fetch(`${serverBackend}/api/v1/post`, {
        method: 'GET',
        cache: 'no-cache',
    });
    if (result.ok) {
        return result.json();
    } else {
        return { message: 'Error' };
    }
}

async function getCategories() {
    const result: any = await fetch(`${serverBackend}/api/v1/category`, {
        method: 'GET',
        cache: 'no-cache',
    });
    if (result.ok) {
        return result.json();
    } else {
        return { message: 'Error' };
    }
}

export default async function Page() {
    let postsRes: any = await getPosts();
    let categoriesRes: any = await getCategories();
    if (postsRes.message === 'success') postsRes = postsRes.data;
    if (categoriesRes.message === 'success') categoriesRes = categoriesRes.data;

    return (
        <div className="flex justify-center mt-2 font-roboto">
            <div className="flex w-wMain flex-col">
                <PostsClient postsRes={postsRes} categoriesRes={categoriesRes} />
            </div>
        </div>
    );
}
