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
    id,
    oldTitle,
    oldContent,
    oldCategoryID,
    oldCategory,
    oldSubCategory,
    oldFilesArr,
    oldserial,
    oldissuance,
    oldAvatar,
    categories,
    parentCategories,
    refresh,
    setRefresh,
}: {
    id: string;
    oldTitle: string;
    oldContent: string;
    oldCategoryID: string;
    oldCategory: string;
    oldSubCategory: string;
    oldserial: string;
    oldissuance: string;
    oldFilesArr: any;
    oldAvatar: string;
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
    const [avatar, setAvatar] = useState<any>(oldAvatar);
    const [imageFile, setImageFile] = useState<any>(null);
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
            if (title.length === 0 || content.length === 0 || avatar === null) {
                setRequire(true);
            } else {
                const formData: any = {
                    user_id: dataContext.id,
                    title: title,
                    content: content,
                    imagelink: avatar,
                    serial_number: serial,
                    Issuance_date: issuance,
                    category_id: String(categoryID),
                    file: filesArr,
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

    const handleCkeditor = (event: any, editor: any) => {
        const data: any = editor.getData();
        setContent(data);
    };

    const handleUploadImg = (e: any) => {
        const file = e.target.files[0];
        const reader: any = new FileReader();

        reader.onloadend = () => {
            setAvatar(reader.result);
            setImageFile(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setAvatar(null);
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
                className="h-[600px] overflow-y-auto"
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
                                {avatar && <Image src="" alt={avatar} fill sizes="10000px" />}
                                {/* {avatar && <Image src={`${serverBackend}${avatar}`} alt={avatar} fill sizes="10000px" />} */}
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
