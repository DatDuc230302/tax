'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { removeDiacriticsAndSpaces } from '@/functions/removeDiacriticsAndSpaces';

const list = [
    { title: 'Tin tức', icon: true },
    { title: 'Văn bản', icon: true },
    { title: 'Sự kiện', icon: false },
];

const list2 = [
    { title: 'con1', parent: 'Tin tức' },
    { title: 'con2', parent: 'Văn bản' },
    { title: 'con3', parent: 'Tin tức' },
];

export default function PostsCategories() {
    const router = useRouter();
    const [category, setCategory] = useState<string>('');
    const [subCategories, setCategories] = useState<object[]>([]);

    useEffect(() => {
        setCategories(list2.filter((subCategory: any) => subCategory.parent === category));
    }, [category]);

    const handleCategory = (category: string) => {
        router.push(`/bai-dang?category=${removeDiacriticsAndSpaces(category)}`);
    };

    const handleSubCategory = (subCategory: string) => {
        router.push(
            `/bai-dang?category=${removeDiacriticsAndSpaces(category)}&subCategory=${removeDiacriticsAndSpaces(
                subCategory,
            )}`,
        );
    };

    return (
        <div className="hidden lg:flex shrink-0 flex-col w-[250px] h-max shadow-xl relative">
            <h2
                onClick={() => router.push('/bai-dang')}
                className="cursor-pointer flex bg-[#0B80FF] text-white justify-center p-2"
            >
                Thể loại
            </h2>
            {list.map((category: any, index: number) => (
                <>
                    <span
                        key={index}
                        onMouseOver={() => setCategory(category.title)}
                        onClick={() => handleCategory(category.title)}
                        className={`categorys-center justify-between flex cursor-pointer p-2 hover:bg-[#e1e1e1] duration-200 ease-linear`}
                    >
                        {category.title}
                        {category.icon && <FiChevronRight fontSize={18} />}
                    </span>
                </>
            ))}
            {subCategories.length > 0 && (
                <div
                    className={`shadow-xl h-full flex-col flex right-[-200px] top-[-1px] pb-1 w-[200px] bg-white absolute`}
                    onMouseLeave={() => setCategory('')}
                >
                    {subCategories.map((subCategory: any, index: number) => (
                        <span
                            key={index}
                            onClick={() => handleSubCategory(subCategory.title)}
                            className="items-cente justify-between flex cursor-pointer p-2 hover:underline text-[14px]"
                        >
                            {subCategory.title}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
