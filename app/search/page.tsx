'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Search() {
    const searchParams = useSearchParams();

    const keyword = searchParams.get('keyword');

    return <div className="flex flex-col"></div>;
}
