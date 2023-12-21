'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AdminContext } from '@/app/admin/layout';
import NoneRole from '@/components/Admin/NoneRole';
import { Tab, Tabs } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import PostsHistory from '../PostsHistory';
import UserHistory from '../UserHistory';

export default function HistoryAdmin() {
    const dataContext = useContext(AdminContext);
    const [postsHistory, setPostsHistory] = useState<object[]>([]);
    const [userHistory, setUserHistory] = useState([]);

    const getUserHistory = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/user_history`);
            setUserHistory(res.data.data);
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    const getPostsHistory = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/post_history`);
            setPostsHistory(res.data.data);
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getPostsHistory();
        getUserHistory();
    }, []);

    return dataContext.role !== 'root' ? (
        <NoneRole />
    ) : (
        <div className="flex w-full flex-col mt-4 h-full px-4">
            <Tabs aria-label="Tabs sizes">
                <Tab key="posts" title="Lịch sử bài viết">
                    <PostsHistory postsHistory={postsHistory} />
                </Tab>
                <Tab key="time" title="Hoạt động">
                    <UserHistory userHistory={userHistory} />
                </Tab>
            </Tabs>
        </div>
    );
}
