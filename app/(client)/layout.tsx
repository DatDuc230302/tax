'use client';

import Header from '@/components/Client/Header';
import Footer from '@/components/Client/Footer';
import ChatBot from '@/components/Client/ChatBot';
import { useEffect, useState, createContext, useCallback } from 'react';
import axios from 'axios';
import { serverBackend } from '@/server';

interface typeContext {
    posts: any;
    settingWeb: any;
}

export const ClientContext = createContext<typeContext>({
    posts: null,
    settingWeb: null,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [settingWebRes, setSettingWebRes] = useState<any>({});
    const [postsRes, setPostsRes] = useState<any>([]);

    const dataContext = {
        posts: postsRes,
        settingWeb: settingWebRes,
    };

    const getSettingWeb = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/ReadSetting`);
            setSettingWebRes(res.data);
        } catch (err: any) {
            console.error('Error fetching settingWeb:', err);
        }
    }, []);

    const getPosts = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/post`);
            if (res.data.message === 'success') {
                setPostsRes(res.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getSettingWeb();
        getPosts();
    }, [getSettingWeb, getPosts]);

    return (
        <ClientContext.Provider value={dataContext}>
            <div className="flex flex-col">
                <Header />
                {children}
                {/* <Footer settingWeb={settingWeb} /> */}
                <ChatBot />
            </div>
        </ClientContext.Provider>
    );
}
