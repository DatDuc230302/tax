import PostsClient from '@/components/Client/PostsClient';
import { serverBackend } from '@/server';
import React from 'react';

async function getPosts() {
    try {
        const result: any = await fetch(`${serverBackend}/api/v1/post`, {
            method: 'GET',
            cache: 'no-cache',
        });
        if (result.ok) {
            return result.json();
        } else {
            return { err: 'None API' };
        }
    } catch {
        return { err: 'None URL' };
    }
}

async function getCategories() {
    try {
        const result: any = await fetch(`${serverBackend}/api/v1/category`, {
            method: 'GET',
            cache: 'no-cache',
        });
        if (result.ok) {
            return result.json();
        } else {
            return { err: 'None API' };
        }
    } catch {
        return { err: 'None URL' };
    }
}

export default async function Page() {
    let postsRes: any = await getPosts();
    let categoriesRes: any = await getCategories();
    if (postsRes.message === 'success') postsRes = postsRes.data;
    if (categoriesRes.message === 'success') categoriesRes = categoriesRes.data;

    if (postsRes.err === 'None API') {
        postsRes = [];
        console.log('Check your posts API at bai-dang page');
    } else if (postsRes.err === 'None URL') {
        postsRes = [];
        console.log('Check your posts URL at bai-dang page');
    }
    // Kiểm tra slidesRes
    if (categoriesRes.err === 'None API') {
        categoriesRes = [];
        console.log('Check your slides API at bai-dang page');
    } else if (categoriesRes.err === 'None URL') {
        categoriesRes = [];
        console.log('Check your slides URL at bai-dang page');
    }

    return (
        <div className="flex justify-center mt-2 font-roboto">
            <div className="flex w-wMain flex-col">
                <PostsClient postsRes={postsRes} categoriesRes={categoriesRes} />
            </div>
        </div>
    );
}
