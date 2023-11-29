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
    SelectItem,
} from '@nextui-org/react';
import { serverBackend, serverImages } from '@/server';
import Image from 'next/image';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import axios from 'axios';
import { isDate } from '@/functions/isDate';
import UploadFiles from '../UploadFiles';
import { AdminContext } from '@/app/admin/layout';
import Editor from '@/components/Common/Editor/Editor';
import { reduceBase64 } from '@/functions/reduceBase64';

export default function UpdatePost({
    id,
    oldTitle,
    oldContent,
    oldShortDesc,
    oldCategoryID,
    oldCategory,
    oldSubCategory,
    oldFilesArr,
    oldserial,
    oldissuance,
    oldImageBase,
    categories,
    parentCategories,
    refresh,
    setRefresh,
}: {
    id: string;
    oldTitle: string;
    oldContent: string;
    oldShortDesc: string;
    oldCategoryID: string;
    oldCategory: string;
    oldSubCategory: string;
    oldserial: string;
    oldissuance: string;
    oldFilesArr: any;
    oldImageBase: string;
    categories: any;
    parentCategories: any;
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);
    const [require, setRequire] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(oldTitle);
    const [category, setCategory] = useState<string>(oldCategory);
    const [subCategory, setSubCategory] = useState<string>(oldSubCategory);
    const [content, setContent] = useState<string>(oldContent);
    const [shortDesc, setShortDesc] = useState<string>(oldShortDesc);
    const [imageBase, setImageBase] = useState<any>(oldImageBase);
    const [filesArr, setFilesArr] = useState<any>(oldFilesArr);
    const [serial, setSerial] = useState<string>(oldserial);
    const [issuance, setIssuance] = useState<string>(oldissuance);
    const [categoryID, setcategoryID] = useState<string>(String(oldCategoryID));
    const dataContext: any = useContext(AdminContext);

    const [showSubCategories, setShowSubCategories] = useState<object[]>(categories);

    useEffect(() => {
        if (category.length === 0) {
            setShowSubCategories(categories);
        } else {
            setShowSubCategories(categories.filter((item: any) => item.parent_name === category));
        }
    }, [category]);

    const handleSubmit = async () => {
        try {
            if (title.length === 0 || content.length === 0 || imageBase === null) {
                setRequire(true);
            } else {
                const formData: any = {
                    user_id: dataContext.id,
                    title: title,
                    content: content,
                    short_desc: shortDesc,
                    image: imageBase,
                    serial_number: serial,
                    Issuance_date: issuance,
                    category_id: String(categoryID),
                    file: filesArr[0] === '[]' || filesArr.length === 0 ? null : filesArr,
                };
                const result = await axios.put(`${serverBackend}/api/v1/post/${id}`, formData);
                if (result.data.message === 'success') {
                    setTurn(false);
                    setRefresh(!refresh);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleUploadImg = (e: any) => {
        const file = e.target.files[0];
        const reader: any = new FileReader();

        reader.onloadend = () => {
            setImageBase(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImageBase(null);
        }
    };

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
                className="h-[750px] flex overflow-y-auto"
                size="4xl"
                isOpen={turn}
                onOpenChange={() => setTurn(false)}
                isDismissable={false}
            >
                <ModalContent className="w-wMain">
                    <ModalHeader className="flex flex-col gap-1">Cập nhật bài viết</ModalHeader>
                    <ModalBody>
                        {/* Thêm tiêu đề */}
                        <>
                            <Input
                                onChange={(e: any) => setTitle(String(e.target.value))}
                                type="text"
                                value={title}
                                label="Tiêu đề bài viết"
                                errorMessage={require && title.length === 0 && 'Vui lòng nhập tiêu đề bài viết'}
                            />
                        </>
                        {/* Thêm Category và SubCategory */}
                        <div className="flex gap-4 relative">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className="w-full h-full px-0" variant="flat">
                                        <Input
                                            errorMessage={
                                                require && subCategory.length === 0 && 'Vui lòng chọn thể loại con'
                                            }
                                            label="Thể loại cha"
                                            type="text"
                                            value={category}
                                        />
                                        <i className="absolute cursor-pointer left-0 right-0 bottom-0 top-0"></i>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    {parentCategories.map((item: any, index: number) => (
                                        <SelectItem
                                            onClick={() => {
                                                setCategory(item.name);
                                                setSubCategory('');
                                            }}
                                            key={index}
                                        >
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className="w-full h-full px-0" variant="flat">
                                        <Input
                                            errorMessage={
                                                require && subCategory.length === 0 && 'Vui lòng chọn thể loại con'
                                            }
                                            label="Thể loại con"
                                            type="text"
                                            value={subCategory}
                                        />
                                        <i className="absolute cursor-pointer left-0 right-0 bottom-0 top-0"></i>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    {showSubCategories.map((item: any, index: number) => (
                                        <DropdownItem onClick={() => handleSubCategoryChange(item)} key={index}>
                                            {item.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        {/* Thêm số hiệu và ngày ban hành */}
                        <div className="flex gap-4 relative">
                            <Input
                                onChange={(e: any) => setSerial(String(e.target.value))}
                                type="text"
                                value={serial ? serial : ''}
                                label="Số hiệu"
                                errorMessage={require && serial.length === 0 && 'Vui lòng nhập số hiệu'}
                            />
                            <Input
                                onChange={(e: any) => setIssuance(String(e.target.value))}
                                type="text"
                                value={issuance ? issuance : ''}
                                label="Ngày ban hành VD: 13\10\2022"
                                errorMessage={
                                    require &&
                                    (issuance.length === 0
                                        ? 'Vui lòng nhập ngày phát hành'
                                        : !isDate(issuance) && 'Vui lòng nhập đúng định dạng thời gian')
                                }
                            />
                        </div>
                        {/* Thêm avatar */}
                        <div className="flex items-center gap-3">
                            <Button className="px-0">
                                <label
                                    className=" h-full px-10 w-full flex justify-center items-center cursor-pointer"
                                    htmlFor="uploadImg"
                                >
                                    Sửa hình
                                </label>
                            </Button>
                            <div style={{ height: 400 }} className="flex border-[1px] relative border-[#ccc] w-full">
                                <Image src={`${imageBase}`} alt={''} fill sizes="10000px" />
                            </div>
                            <input onChange={(e) => handleUploadImg(e)} id="uploadImg" type="file" hidden />
                        </div>
                        {/* Thêm content */}
                        <>
                            <Editor content={content} setContent={setContent} />
                        </>
                        {/* Mô tả ngắn */}
                        <textarea
                            placeholder="Mô tả ngắn"
                            className="h-[56px] py-2 px-3 rounded-[12px] outline-none bg-[#f4f4f5]"
                            onChange={(e) => setShortDesc(String(e.target.value))}
                            value={shortDesc}
                        />
                        {/* Thêm file */}
                        <UploadFiles filesArr={filesArr} setFilesArr={setFilesArr} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => setTurn(false)}>
                            Đóng
                        </Button>
                        <Button color="primary" onPress={() => handleSubmit()}>
                            Cập nhật
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
