import PostsClient from '@/components/Client/PostsClient';
import React from 'react';

export default function Page() {
    return (
        <div className="flex justify-center mt-2 font-roboto">
            <div className="flex w-[1200px] flex-col">
                <PostsClient />
            </div>
        </div>
    );
}
