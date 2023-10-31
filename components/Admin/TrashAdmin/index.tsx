'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import TrashAccounts from '../TrashAccounts';
import TrashPosts from '../TrashPosts';

export default function TrashAdmin() {
    return (
        <div className="flex w-full flex-col p-4">
            <Tabs aria-label="Dynamic tabs">
                <Tab key={'Accounts'} title={'Tài khoản'}>
                    <TrashAccounts />
                </Tab>
                <Tab key={'Posts'} title={'Bài đăng'}>
                    <TrashPosts />
                </Tab>
            </Tabs>
        </div>
    );
}
