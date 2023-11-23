'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { removeDiacriticsAndSpaces } from '@/functions/removeDiacriticsAndSpaces';
import Link from 'next/link';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function PostsCategories({ categoriesRes }: { categoriesRes: any }) {
    const router = useRouter();
    const categories: any = categoriesRes;

    return (
        <div className="flex flex-col gap-2">
            <div className="w-[250px] shadow-2xl rounded-[8px] overflow-hidden h-max">
                <h2
                    onClick={() => router.push('/bai-dang')}
                    className="cursor-pointer flex bg-[#0B80FF] text-white justify-center p-2"
                >
                    Thể loại
                </h2>
                <Accordion selectionMode="single">
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
