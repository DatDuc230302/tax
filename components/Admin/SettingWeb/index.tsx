'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import SettingFooter from '../SettingFooter';
import SettingHeader from '../SettingHeader';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function SettingWeb() {
    useEffect(() => {
        document.title = 'Quản lý trang';
    }, []);

    const [data, setData] = useState<any>({
        theme_color: '',
        footer_color: '',
        footer_owner: '',
        footer_address: '',
        footer_phone: '',
        footer_email: '',
        footer_workingHours: '',
        footer_website: '',
        header_backGround: '',
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(`${serverBackend}/api/v1/ReadSetting`);
            setData(res.data);
        } catch (err: any) {
            console.log(err);
        }
    };

    const updateData = async () => {
        const res = await axios.post(`${serverBackend}/api/v1/UpdateSetting`, data);
        if (res.data.message === 'success') {
        }
    };

    return (
        <div className="flex w-full flex-col px-4 mt-4">
            <Tabs aria-label="Options">
                <Tab key="footer" title="Footer">
                    <SettingFooter data={data} setData={setData} updateData={updateData} />
                </Tab>
                <Tab key="header" title="Header">
                    <SettingHeader data={data} setData={setData} updateData={updateData} />
                </Tab>
            </Tabs>
        </div>
    );
}
