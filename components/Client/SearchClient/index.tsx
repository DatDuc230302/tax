'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function SearchClient() {
    const searchParams = useSearchParams();
    const key = searchParams.get('key');
    return (
        <div className="flex justify-center min-h-[700px] px-4">
            <div className="flex w-wMain">{key}</div>
        </div>
    );
}
