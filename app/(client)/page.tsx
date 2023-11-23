import Service from '@/components/Client/Service';
import Slide from '@/components/Client/Slide';
import Video from '@/components/Client/Video';
import HotPosts from '@/components/Client/HotPosts';
import News from '@/components/Client/News';
import RecentPosts from '@/components/Client/RecentPosts';
import { serverBackend } from '@/server';
import { useEffect } from 'react';

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

async function getSlides() {
    const result: any = await fetch(`${serverBackend}/api/v1/getBanner`, {
        method: 'GET',
        cache: 'no-store',
    });
    if (result.ok) {
        return result.json();
    } else {
        return { message: 'Error' };
    }
}

export default async function Page() {
    let posts = await getPosts();
    let slides = await getSlides();
    if (posts.message === 'success') {
        posts = posts.data;
    }
    if (slides.message === 'success') {
        slides = slides.data;
    }

    return (
        <div className="flex flex-col">
            <Slide slides={slides} />
            <HotPosts posts={posts} />
            <News posts={posts} />
            <RecentPosts posts={posts} />
            <Video />
        </div>
    );
}
