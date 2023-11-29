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
    categories: any;
    slides: any;
}

export const ClientContext = createContext<typeContext>({
    posts: null,
    settingWeb: null,
    categories: null,
    slides: null,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [settingWebRes, setSettingWebRes] = useState<any>({});
    const [postsRes, setPostsRes] = useState<any>([]);
    const [categoriesRes, setCategoriesRes] = useState<any>([]);
    const [slidesRes, setSlidesRes] = useState<any>([]);

    const dataContext = {
        posts: postsRes,
        settingWeb: settingWebRes,
        categories: categoriesRes,
        slides: slidesRes,
    };

    const getPosts = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/post`);
            if (res.data.message === 'success') {
                setPostsRes(res.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    const getSettingWeb = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/ReadSetting`);
            setSettingWebRes(res.data);
        } catch (err: any) {
            console.error('Error fetching settingWeb:', err);
        }
    }, []);

    const getCategories = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/category`);
            if (res.data.message === 'success') {
                setCategoriesRes(res.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    const getSlides = useCallback(async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/getBanner`);
            if (res.data.message === 'success') {
                setSlidesRes(res.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getPosts();
        getSettingWeb();
        getCategories();
        getSlides();
    }, [getSettingWeb, getPosts, getCategories]);

    return (
        <ClientContext.Provider value={dataContext}>
            <div className="flex flex-col">
                <Header />
                {children}
                <Footer />
                <ChatBot />
            </div>
        </ClientContext.Provider>
    );
}
