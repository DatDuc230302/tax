'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import SettingFooter from '../SettingFooter';

export default function SettingWeb() {
    return (
        <div className="flex w-full flex-col px-4 mt-4">
            <Tabs aria-label="Options">
                <Tab key="footer" title="Footer">
                    <SettingFooter />
                </Tab>
                <Tab key="header" title="Header"></Tab>
            </Tabs>
        </div>
    );
}
