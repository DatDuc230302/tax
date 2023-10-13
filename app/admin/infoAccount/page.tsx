'use client';

import React, { useContext } from 'react';
import { AdminContext } from '../layout';

export default function InfoAccount() {
    const dataContext: any = useContext(AdminContext);
    return (
        <div className="flex w-full mt-4 justify-center">
            <div className="w-[1170px] flex flex-col">
                <span>Tên: {dataContext.name}</span>
                <span>Quyền: {dataContext.role}</span>
            </div>
        </div>
    );
}
