'use client';

import React, { useContext, useEffect, useState } from 'react';

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
import { isDate } from '@/functions/isDate';
import UploadFiles from '../UploadFiles';
import { AdminContext } from '@/app/admin/layout';

export default function UpdatePost({
    oldTitle,
    oldContent,
    oldCategory,
    oldSubCategory,
    oldFilesArr,
    oldserial,
    oldissuance,
    img,
    categories,
    parentCategories,
    refresh,
    setRefresh,
}: {
    oldTitle: string;
    oldContent: string;
    oldCategory: string;
    oldSubCategory: string;
    oldserial: string,
    oldissuance: string,
    oldFilesArr: any;
    img: string;
    categories: object[];
    parentCategories: object[];
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
    const [imageFile, setImageFile] = useState<any>(null);
    const [filesArr, setFilesArr] = useState<any>(oldFilesArr);
    const [serial, setSerial] = useState<string>(oldserial);
    const [issuance, setIssuance] = useState<string>(oldissuance);
    const [categoryID, setcategoryID] = useState<string>('');
    const dataContext: any = useContext(AdminContext);
    const [showSubCategories, setShowSubCategories] = useState<object[]>(categories);
    const handleSubmit = async () => {
        if (
            title.length === 0 ||
            category.length === 0 ||
            subCategory.length === 0 ||
            content.length === 0 ||
            image === null
        ) {
            setRequire(true);
        } else {
             const formData: any = new FormData();
                formData.append('user_id', dataContext.id);
                formData.append('title', title);
                formData.append('content', content);
                formData.append('imagelink', image, image.name);
                formData.append('serial_number', serial);
                formData.append('Issuance_date', issuance);
                formData.append('category_id', categoryID);
                formData.append('file', filesArr);
                const result = await axios.post(`${serverBackend}/api/v1/post`, formData);
                if (result.data.message === 'success') {
                    setTurn(false);
                    setRefresh(!refresh);
                }
        }
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
            setImageFile(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };
    // useEffect(() => {
    //     if (category.length === 0) {
    //         setShowSubCategories(categories);
    //     } else {
    //         setShowSubCategories(categories.filter((item: any) => item.parent_name === category));
    //     }
    // }, [category]);
    const handleSubCategoryChange = (item: any) => {
        setSubCategory(item.name);
        setcategoryID(item.id);
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
                                    <div className="relative w-full h-[50px]">
                                        <Input
                                            label="Thể loại cha"
                                            type="text"
                                            className="flex pb-4 justify-start cursor-pointer"
                                            value={category}
                                        />
                                        <div className="absolute cursor-pointer justify-end top-0 items-center px-4 w-full h-full z-10 flex">
                                            <BsChevronDown fontSize={18} />
                                        </div>
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Multiple selection example"
                                    variant="flat"
                                    closeOnSelect={false}
                                    selectionMode="single"
                                >
                                    {parentCategories.map((item: any, index: number) => (
                                        <DropdownItem onClick={() => setCategory(item.name)} key={index}>
                                            {item.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="relative w-full h-[50px]">
                                        <Input
                                            label="Thể loại con"
                                            type="text"
                                            className="flex pb-4 justify-start cursor-pointer"
                                            value={subCategory}
                                        />
                                        <div className="absolute cursor-pointer justify-end top-0 items-center px-4 w-full h-full z-10 flex">
                                            <BsChevronDown fontSize={18} />
                                        </div>
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Multiple selection example"
                                    variant="flat"
                                    closeOnSelect={false}
                                    selectionMode="single"
                                >
                                    {categories.map(
                                        (item: any, index: number) =>
                                            item.parent_name && (
                                                <DropdownItem onClick={() => handleSubCategoryChange(item)} key={index}>
                                                    {item.name}
                                                </DropdownItem>
                                            ),
                                    )}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="flex gap-4 relative">
                            <Input
                                onChange={(e: any) => setSerial(String(e.target.value))}
                                type="text"
                                value={serial}
                                label="Số hiệu"
                                errorMessage={require && serial.length === 0 && 'Vui lòng nhập số hiệu'}
                            />
                            <Input
                                onChange={(e: any) => setIssuance(String(e.target.value))}
                                type="text"
                                value={issuance}
                                label="Ngày ban hành VD: 13\10\2022"
                                errorMessage={
                                    require &&
                                    (issuance.length === 0
                                        ? 'Vui lòng nhập ngày phát hành'
                                        : !isDate(issuance) && 'Vui lòng nhập đúng định dạng thời gian')
                                }
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div style={{ height: 400 }} className="flex border-[1px] relative border-[#ccc] w-full">
                                {image && <Image src={image} alt="" fill sizes="10000px" />}
                            </div>
                        </div>
                        <>
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
                        </>
                        <UploadFiles filesArr={filesArr} setFilesArr={setFilesArr} />
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
