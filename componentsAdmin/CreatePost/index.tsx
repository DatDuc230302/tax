import React, { useContext, useEffect, useState } from 'react';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { serverBackend } from '@/server';
import { BiUpload } from 'react-icons/bi';
import Image from 'next/image';
import { isDate } from '@/functions/isDate';
import axios from 'axios';
import { AdminContext } from '@/app/admin/layout';

export default function CreatePost({
    refresh,
    setRefresh,
    subCategories,
}: {
    refresh: boolean;
    setRefresh: any;
    subCategories: object[];
}) {
    // Cho phép bật tắt creatPost
    const [turn, setTurn] = useState<boolean>(false);

    const dataContext: any = useContext(AdminContext);

    // State cho phép hiển thị ảnh khi người dùng tải lên
    const [showImage, setShowImage] = useState<any>(null);
    // State cho phép gữi file ảnh lên server
    const [image, setImage] = useState<any>(null);
    // State tiêu đề của bài đăng
    const [title, setTitle] = useState<string>('');
    // State thể loại của bài đăng
    const [category, setCategory] = useState<string>('');
    // State thể loại con của bài đăng
    const [subCategory, setSubCategory] = useState<string>('');
    // State số hiệu bài đăng
    const [serial, setSerial] = useState<string>('');
    // State ngày phát hành bài đăng
    const [issuance, setIssuance] = useState<string>('');
    // State nội dung bài đăng
    const [content, setContent] = useState<string>('Nội dung bài viết');
    // State check validate
    const [require, setRequire] = useState<boolean>(false);
    // State nối bảng giữ subcategories và categories
    const [showSubCategories, setShowSubCategories] = useState<object[]>(subCategories);

    useEffect(() => {
        if (category.length === 0) {
            setShowSubCategories(subCategories);
        } else {
            setShowSubCategories(subCategories.filter((item: any) => item.category_name === category));
        }
    }, [category]);

    const handleSubmit = async () => {
        try {
            if (
                title.length === 0 ||
                category.length === 0 ||
                subCategory.length === 0 ||
                isDate(issuance) === false ||
                content.length === 0
            ) {
                setRequire(true);
            } else {
                const tempIdSubCategory: any = showSubCategories.filter(
                    (item: any) => item.subcategory_name === subCategory,
                );
                const idSubCategory: string = String(tempIdSubCategory[0].id);
                const formData: any = new FormData();
                formData.append('user_id', dataContext.id);
                formData.append('title', title);
                formData.append('content', content);
                formData.append('image', image, image.name);
                formData.append('serial_number', serial);
                formData.append('Issuance_date', issuance);
                formData.append('subcategory_id', idSubCategory);
                const result = await axios.post(`${serverBackend}/api/v1/post`, formData);
                if (result.data.message === 'success') {
                    setTurn(false);
                    setRefresh(!refresh);
                }
            }
        } catch {
            alert('Khong the post');
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
            setImage(file);
            setShowImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };

    return (
        <>
            <Button
                onClick={() => setTurn(true)}
                className="shrink-0 lg:w-[180px] w-[100%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] p-0"
                color="primary"
            >
                <AiOutlinePlusCircle fontSize={20} />
                Thêm bài viết
            </Button>
            <Modal
                style={{ height: 700, overflow: 'auto' }}
                size="3xl"
                isOpen={turn}
                onOpenChange={() => setTurn(false)}
                isDismissable={false}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm bài viết</ModalHeader>
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
                                    {subCategories.map((item: any, index: number) => (
                                        <SelectItem onClick={() => setCategory(item.category_name)} key={index}>
                                            {item.category_name}
                                        </SelectItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        isDisabled={category.length === 0}
                                        className="w-full h-full px-0"
                                        variant="flat"
                                    >
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
                                        <DropdownItem onClick={() => setSubCategory(item.subcategory_name)} key={index}>
                                            {item.subcategory_name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="flex gap-4 relative">
                            <Input
                                onChange={(e) => setSerial(String(e.target.value))}
                                type="text"
                                value={serial}
                                label="Số hiệu"
                                errorMessage={require && serial.length === 0 && 'Vui lòng nhập số hiệu'}
                            />
                            <Input
                                onChange={(e) => setIssuance(String(e.target.value))}
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
                            <Button color="default" className="w-[250px] p-4">
                                <label
                                    className="w-full h-full flex items-center cursor-pointer justify-center"
                                    htmlFor="uploadImg"
                                >
                                    <BiUpload color={'black'} fontSize={20} />
                                    Tải hình đại diện
                                </label>
                            </Button>
                            <div style={{ height: 300 }} className="flex border-[1px] relative border-[#ccc] w-full">
                                {image && <Image src={showImage} alt="" sizes="300px" fill={true} />}
                            </div>
                        </div>
                        <CKEditor
                            config={{
                                ckfinder: {
                                    uploadUrl: `${serverBackend}/api/v1/upload-images`,
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
