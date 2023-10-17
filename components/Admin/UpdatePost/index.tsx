'use client';

import React, { useEffect, useState } from 'react';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Tooltip,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { serverBackend, serverImages } from '@/server';
import Image from 'next/image';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { BsChevronDown } from 'react-icons/bs';
import axios from 'axios';

export default function UpdatePost({
    oldTitle,
    oldContent,
    oldCategory,
    oldSubCategory,
    img,
    categories,
    subCategories,
    refresh,
    setRefresh,
}: {
    oldTitle: string;
    oldContent: string;
    oldCategory: string;
    oldSubCategory: string;
    img: string;
    categories: object[];
    subCategories: object[];
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);
    const [image, setImage] = useState<any>(img);
    const [title, setTitle] = useState<string>(oldTitle);
    const [category, setCategory] = useState<string>(oldCategory);
    const [subCategory, setSubCategory] = useState<string>(oldSubCategory);
    const [content, setContent] = useState<string>(oldContent);
    const [require, setRequire] = useState<boolean>(false);

    const handleSubmit = async () => {
        // if (
        //     title.length === 0 ||
        //     category.length === 0 ||
        //     subCategory.length === 0 ||
        //     content.length === 0 ||
        //     image === null
        // ) {
        //     setRequire(true);
        // } else {
        // }
        const result = await axios.put(`${serverBackend}/api/v1/post`, {});
    };

    const handleCkeditor = (event: any, editor: any) => {
        const data: any = editor.getData();
        setContent(data);
    };

    const handleUploadImg = (e: any) => {
        const file = e.target.files[0];
        const reader: any = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };

    return (
        <>
            <Tooltip color="primary" content="Cập nhật bài viết">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <HiMiniPencilSquare fontSize={20} />
                </i>
            </Tooltip>
            <Modal
                style={{ height: 700, overflow: 'auto' }}
                size="3xl"
                isOpen={turn}
                onOpenChange={() => setTurn(false)}
                isDismissable={false}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Cập nhật bài viết</ModalHeader>
                    <ModalBody>
                        <Input
                            onChange={(e) => setTitle(String(e.target.value))}
                            type="text"
                            value={title}
                            label="Tiêu đề bài viết"
                            errorMessage={require && title.length === 0 && 'Vui lòng nhập tiêu đề bài viết'}
                        />
                        <div className="flex gap-4 h-[50px]">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className="h-full w-full px-0 relative">
                                        <Input
                                            label="Thể loại cha"
                                            type="text"
                                            className="flex pb-4 justify-start cursor-pointer"
                                            value={category}
                                        />
                                        <div className="absolute w-full h-full z-10 flex items-center justify-end px-4">
                                            <BsChevronDown fontSize={18} />
                                        </div>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Multiple selection example"
                                    variant="flat"
                                    closeOnSelect={false}
                                    selectionMode="single"
                                >
                                    {categories.map((item: any, index: number) => (
                                        <DropdownItem onClick={() => setCategory(item.name)} key={index}>
                                            {item.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className="h-full w-full px-0 relative">
                                        <Input
                                            label="Thể loại con"
                                            type="text"
                                            className="flex pb-4 justify-start cursor-pointer"
                                            value={subCategory}
                                        />
                                        <div className="absolute w-full h-full z-10 flex items-center justify-end px-4">
                                            <BsChevronDown fontSize={18} />
                                        </div>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Multiple selection example"
                                    variant="flat"
                                    closeOnSelect={false}
                                    disallowEmptySelection
                                    selectionMode="single"
                                >
                                    {subCategories.map((item: any, index: number) => (
                                        <DropdownItem onClick={() => setSubCategory(item.subcategory_name)} key={index}>
                                            {item.subcategory_name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="flex items-center gap-3">
                            <div style={{ height: 400 }} className="flex border-[1px] relative border-[#ccc] w-full">
                                {image && <Image src={image} alt="" fill sizes="10000px" />}
                            </div>
                        </div>
                        <CKEditor
                            config={{
                                ckfinder: {
                                    uploadUrl: `${serverImages}/upload`,
                                },
                            }}
                            data={content}
                            onChange={handleCkeditor}
                            editor={ClassicEditor}
                        />

                        <input onChange={(e) => handleUploadImg(e)} id="uploadImg" type="file" hidden />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => setTurn(false)}>
                            Đóng
                        </Button>
                        <Button color="primary" onPress={() => handleSubmit()}>
                            Thêm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
