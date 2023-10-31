'use client';
import { BsInfoCircle } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, Tooltip } from '@nextui-org/react';

import TrashAccounts from '../TrashAccounts';
import TrashPosts from '../TrashPosts';
export default function TrashAdmin() {
    return (
        <div className="flex w-full flex-col p-4">
            <Tabs aria-label="Dynamic tabs">
                <Tab key={'Accounts'} title={'Bài đăng'}>
                    <TrashPosts />
                </Tab>
                <Tab key={'accounts'} title={'Tài khoản'}>
                    <TrashAccounts />
                </Tab>
            </Tabs>
        </div>
    );
}
