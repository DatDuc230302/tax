import Service from '@/components/Client/Service';
import Slide from '@/components/Client/Slide';
import Video from '@/components/Client/Video';
import HotPosts from '@/components/Client/HotPosts';
import News from '@/components/Client/News';
import RecentPosts from '@/components/Client/RecentPosts';
import { serverBackend } from '@/server';
import { useEffect } from 'react';

async function getPosts() {
    const result: any = await fetch(`${serverBackend}/api/v1/post`);
    if (!result.ok) {
        throw new Error('Failed to fetch data');
    }

    return result.json();
}

export default async function Page() {
    let posts = await getPosts();
    if (posts.message === 'success') {
        posts = posts.data;
    } else {
    }
    return (
        <div className="flex flex-col">
            <Slide />
            <HotPosts posts={posts} />
            <News posts={posts} />
            <RecentPosts posts={posts} />
            <Video />
        </div>
    );
}
