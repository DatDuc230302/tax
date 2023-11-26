'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchTool({ className }: { className?: string }) {
    const router = useRouter();
    const [valueInput, setValueInput] = useState<string>('');

    const handleOnchange = (value: string) => {
        value[0] !== ' ' && setValueInput(value);
    };

    const handleSearch = () => {
        if (valueInput.length > 0) {
            router.push(`/bai-dang?search=${valueInput}`);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center gap-3 h-full">
            <div className={`bg-white flex items-center px-3 rounded-[6px] ${className}`}>
                <input
                    onChange={(e) => handleOnchange(e.target.value)}
                    placeholder="Tìm kiếm"
                    type="text"
                    className="outline-none py-1 pr-1 text-[14px]"
                    onKeyDown={(e) => onKeyDown(e)}
                    value={valueInput}
                />
                <div onClick={() => handleSearch()} className="cursor-pointer">
                    <FaSearch color={'#909090'} />
                </div>
            </div>
        </div>
    );
}
