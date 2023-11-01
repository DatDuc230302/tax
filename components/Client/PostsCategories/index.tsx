'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { removeDiacriticsAndSpaces } from '@/functions/removeDiacriticsAndSpaces';
import axios from 'axios';
import { serverBackend } from '@/server';
import css from './PostsCategories.module.scss';
import Link from 'next/link';

export default function PostsCategories() {
    const router = useRouter();
    const [categories, setCategories] = useState<object[]>([]);

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
        <div className="hidden lg:flex shrink-0 flex-col w-[250px] h-max shadow-xl relative">
            <h2
                onClick={() => router.push('/bai-dang')}
                className="cursor-pointer flex bg-[#0B80FF] text-white justify-center p-2"
            >
                Thể loại
            </h2>
            {categories.map(
                (item: any, index: number) =>
                    !item.parent_name && (
                        <div key={index} className={`${css.category} relative`}>
                            <Link
                                href={`/bai-dang?category=${removeDiacriticsAndSpaces(item.name)}`}
                                className={`categorys-center justify-between flex cursor-pointer p-2 hover:bg-[#e1e1e1] duration-200 ease-linear`}
                            >
                                {item.name}
                                {categories.filter((it: any) => it.parent_name === item.name).length > 0 && (
                                    <FiChevronRight fontSize={18} />
                                )}
                            </Link>
                            <div
                                className={`${css.subCategory} shadow-xl flex flex-col absolute w-[80%] h-max bg-white right-[-200px] top-0`}
                            >
                                {categories.map(
                                    (subCategory: any, index: number) =>
                                        subCategory.parent_name === item.name && (
                                            <Link
                                                href={`/bai-dang?category=${removeDiacriticsAndSpaces(
                                                    item.name,
                                                )}&subCategory=${removeDiacriticsAndSpaces(subCategory.name)}`}
                                                className="categorys-center justify-between flex cursor-pointer p-2 hover:bg-[#e1e1e1]"
                                                key={index}
                                            >
                                                {subCategory.name}
                                            </Link>
                                        ),
                                )}
                            </div>
                        </div>
                    ),
            )}
        </div>
    );
}
