import Slides from '@/components/Client/Slides';
import Video from '@/components/Client/Video';
import HotPosts from '@/components/Client/HotPosts';
import News from '@/components/Client/News';
import RecentPosts from '@/components/Client/RecentPosts';
import { serverBackend } from '@/server';

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

async function getSlides() {
    try {
        const result: any = await fetch(`${serverBackend}/api/v1/getBanner`, {
            method: 'GET',
            cache: 'no-store',
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
    let postsRes = await getPosts();
    let slidesRes = await getSlides();

    // Kiếm tra postsRes
    if (postsRes.err === 'None API') {
        postsRes = [];
        console.log('Check your posts API at home page');
    } else if (postsRes.err === 'None URL') {
        postsRes = [];
        console.log('Check your posts URL at home page');
    }
    // Kiểm tra slidesRes
    if (slidesRes.err === 'None API') {
        slidesRes = [];
        console.log('Check your slides API at home page');
    } else if (slidesRes.err === 'None URL') {
        slidesRes = [];
        console.log('Check your slides URL at home page');
    }

    return (
        <div className="flex flex-col">
            <Slides slidesRes={slidesRes} />
            <HotPosts postsRes={postsRes} />
            <News postsRes={postsRes} />
            <RecentPosts postsRes={postsRes} />
            <Video />
        </div>
    );
}
