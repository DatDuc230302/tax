import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import React, { useState } from 'react';

export default function SortPosts({ parentCategories, categories }: { parentCategories: any; categories: any }) {
    const [selection, setSelection] = useState<string>('Tiêu đề');
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');
    const [sortCategory, setSortCategory] = useState<string>('Sắp xếp thể loại cha');
    const [sortSubCategory, setSortSubCategory] = useState<string>('Sắp xếp thể loại con');

    return (
        <div className="flex flex-col h-max gap-3">
            <div className="flex w-full gap-3 justify-between">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                            variant="flat"
                        >
                            {sortCategory}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Single selection example" variant="flat">
                        <DropdownItem onClick={() => setSortCategory('Sắp xếp thể loại cha')} key={'all'}>
                            Tất cả
                        </DropdownItem>
                        {parentCategories.map((item: any, index: number) => (
                            <DropdownItem onClick={() => setSortCategory(item.name)} key={index}>
                                {item.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
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
                            className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
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
            </div>
            <div className="flex items-center h-full flex-1 relative ">
                <Input
                    onChange={(e) => setSearchValue(String(e.target.value))}
                    className="rounded-none"
                    type="text"
                    placeholder={`Tìm kiếm theo ${selection}`}
                    value={searchValue}
                />
                <div className="absolute right-0">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="flat">{selection}</Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                        >
                            <DropdownItem onClick={() => setSelection('Tiêu đề')} key="title">
                                Tiêu đề
                            </DropdownItem>
                            <DropdownItem onClick={() => setSelection('Nội dung')} key="content">
                                Nội dung
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
