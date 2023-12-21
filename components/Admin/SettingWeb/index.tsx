'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import SettingFooter from '../SettingFooter';
import SettingHeader from '../SettingHeader';
import axios from 'axios';
import { serverBackend } from '@/server';
import SnackbarTimeout from '@/components/Common/SnackbarTimeout';

export default function SettingWeb() {
    useEffect(() => {
        document.title = 'Quản lý trang';
    }, []);

    const [data, setData] = useState<any>(null);
    const [updated, setUpdated] = useState<boolean>(false);

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
        try {
            const res = await axios.post(`${serverBackend}/api/v1/UpdateSetting`, data);
            if (res.data.message === 'success') {
                setUpdated(true);
            }
        } catch (err: any) {}
    };

    return (
        <>
            <SnackbarTimeout turn={updated} setTurn={setUpdated} title="Cập nhật thành công" />
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
        </>
    );
}
