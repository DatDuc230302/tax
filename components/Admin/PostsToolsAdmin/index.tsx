import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import ManageCategory from '../ManageCategory';
import CreatePost from '../CreatePost';

export default function PostsToolsAdmin({
    setPosts,
    initialPosts,
    parentCategories,
    categories,
    refresh,
    setRefresh,
}: {
    setPosts: any;
    initialPosts: object[];
    parentCategories: any;
    categories: any;
    refresh: boolean;
    setRefresh: any;
}) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');
    const [sortCategory, setSortCategory] = useState<string>('Sắp xếp thể loại cha');
    const [sortSubCategory, setSortSubCategory] = useState<string>('Sắp xếp thể loại con');
    const [sortPosts, setSortPosts] = useState<object[]>([]);

    useEffect(() => {
        const key: string = searchValue;
        if (key.length > 0) {
            setPosts(sortPosts.filter((item: any) => item.title.toLocaleLowerCase().includes(key.toLocaleLowerCase())));
        }
    }, [searchValue]);

    useEffect(() => {
        let sortData: object[] = [];
        if (sortStatus === 'Sắp xếp trạng thái') {
            if (sortCategory !== 'Sắp xếp thể loại cha') {
                if (sortSubCategory !== 'Sắp xếp thể loại con') {
                    sortData = initialPosts.filter(
                        (item: any) => item.parent_name === sortCategory && item.category_name === sortSubCategory,
                    );
                } else {
                    sortData = initialPosts.filter((item: any) => item.parent_name === sortCategory);
                }
            } else {
                sortData = initialPosts;
            }
        } else if (sortStatus === 'Hoạt động') {
            if (sortCategory !== 'Sắp xếp thể loại cha') {
                if (sortSubCategory !== 'Sắp xếp thể loại con') {
                    sortData = initialPosts.filter(
                        (item: any) =>
                            item.parent_name === sortCategory &&
                            item.category_name === sortSubCategory &&
                            item.status === 'active',
                    );
                } else {
                    sortData = initialPosts.filter(
                        (item: any) => item.parent_name === sortCategory && item.status === 'active',
                    );
                }
            } else {
                sortData = initialPosts.filter((item: any) => item.status === 'active');
            }
        } else if (sortStatus === 'Không hoạt động') {
            if (sortCategory !== 'Sắp xếp thể loại cha') {
                if (sortSubCategory !== 'Sắp xếp thể loại con') {
                    sortData = initialPosts.filter(
                        (item: any) =>
                            item.parent_name === sortCategory &&
                            item.category_name === sortSubCategory &&
                            item.status === 'inactive',
                    );
                } else {
                    sortData = initialPosts.filter(
                        (item: any) => item.parent_name === sortCategory && item.status === 'inactive',
                    );
                }
            } else {
                sortData = initialPosts.filter((item: any) => item.status === 'inactive');
            }
        }
        setPosts(sortData);
        setSortPosts(sortData);
    }, [sortStatus, initialPosts, sortCategory, sortSubCategory]);

    return (
        <div className="flex flex-col h-max gap-3">
            <div className="flex flex-col lg:flex-row w-full gap-3">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="shrink-0 h-[40px] text-white lg:w-[180px] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                            variant="flat"
                        >
                            {sortCategory}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Single selection example" variant="flat">
                        <DropdownItem
                            onClick={() => {
                                setSortCategory('Sắp xếp thể loại cha');
                                setSortSubCategory('Sắp xếp thể loại con');
                            }}
                            key={'all'}
                        >
                            Tất cả
                        </DropdownItem>
                        {parentCategories.map((item: any, index: number) => (
                            <DropdownItem
                                onClick={() => {
                                    setSortCategory(item.name);
                                    setSortSubCategory('Sắp xếp thể loại con');
                                }}
                                key={index}
                            >
                                {item.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="shrink-0 h-[40px] text-white lg:w-[180px] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                            variant="flat"
                        >
                            {sortSubCategory}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Single selection example" variant="flat">
                        <DropdownItem onClick={() => setSortSubCategory('Sắp xếp thể loại con')} key={'all'}>
                            Tất cả
                        </DropdownItem>
                        {categories.map(
                            (item: any, index: number) =>
                                item.parent_name === sortCategory && (
                                    <DropdownItem onClick={() => setSortSubCategory(item.name)} key={index}>
                                        {item.name}
                                    </DropdownItem>
                                ),
                        )}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="shrink-0 h-[40px] text-white lg:w-[180px] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                            variant="flat"
                        >
                            {sortStatus}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Single selection example" variant="flat">
                        <DropdownItem onClick={() => setSortStatus('Sắp xếp trạng thái')} key="text">
                            Tất cả
                        </DropdownItem>
                        <DropdownItem onClick={() => setSortStatus('Hoạt động')} key="text">
                            Hoạt động
                        </DropdownItem>
                        <DropdownItem onClick={() => setSortStatus('Không hoạt động')} key="text">
                            Không hoạt động
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <ManageCategory refresh={refresh} setRefresh={setRefresh} />
                <CreatePost
                    categories={categories}
                    parentCategories={parentCategories}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            </div>
            <div className="flex items-center h-full flex-1 relative ">
                <Input
                    onChange={(e) => setSearchValue(String(e.target.value))}
                    className="rounded-none"
                    type="text"
                    placeholder={`Tìm kiếm theo tên bài viết`}
                    value={searchValue}
                />
            </div>
        </div>
    );
}
