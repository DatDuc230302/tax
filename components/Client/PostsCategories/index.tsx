'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { removeDiacriticsAndSpaces } from '@/functions/removeDiacriticsAndSpaces';
import axios from 'axios';
import { serverBackend } from '@/server';
import Link from 'next/link';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function PostsCategories() {
    const router = useRouter();
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/category`);
            if (result.data.message === 'success') {
                setCategories(result.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col gap-2 sticky top-[200px]">
            <div className="w-[250px] shadow-2xl rounded-[8px] overflow-hidden h-max">
                <h2
                    onClick={() => router.push('/bai-dang')}
                    className="cursor-pointer flex bg-[#0B80FF] text-white justify-center p-2"
                >
                    Thể loại
                </h2>
                <Accordion selectionMode="multiple">
                    {categories
                        .map(
                            (category: any, index: number) =>
                                category.parent_name === null && (
                                    <AccordionItem
                                        className="p-0 m-0"
                                        classNames={{ title: 'text-[16px]' }}
                                        key={index}
                                        title={category.name}
                                    >
                                        <div className="flex flex-col">
                                            {categories.map(
                                                (subCategory: any, index: number) =>
                                                    subCategory.parent_name === category.name && (
                                                        <Link
                                                            href={`/bai-dang?category=${removeDiacriticsAndSpaces(
                                                                category.name,
                                                            )}&subCategory=${removeDiacriticsAndSpaces(
                                                                subCategory.name,
                                                            )}`}
                                                            key={index}
                                                            className="p-1 rounded-[8px] w-full h-full hover:bg-[#ccc] cursor-pointer duration-100 ease-linear"
                                                        >
                                                            {subCategory.name}
                                                        </Link>
                                                    ),
                                            )}
                                        </div>
                                    </AccordionItem>
                                ),
                        )
                        .filter(Boolean)}
                </Accordion>
            </div>
        </div>
    );
}
