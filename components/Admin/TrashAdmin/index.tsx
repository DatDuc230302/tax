'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

export default function TrashAdmin() {
    return (
        <div className="flex flex-col p-4">
            <Tabs aria-label="Dynamic tabs">
                <Tab key={'Accounts'} title={'Tài khoản'}>
                    Tài khoản
                </Tab>
                <Tab key={'Posts'} title={'Bài đăng'}>
                    Bài đăng
                </Tab>
            </Tabs>
        </div>
    );
}
