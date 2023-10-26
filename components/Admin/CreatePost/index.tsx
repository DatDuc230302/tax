'use client';

import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    SelectItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { AiFillFileAdd, AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai';
import { serverBackend } from '@/server';
import { BiUpload } from 'react-icons/bi';
import Image from 'next/image';
import { isDate } from '@/functions/isDate';
import axios from 'axios';
import { AdminContext } from '@/app/admin/layout';
import SnackbarMessage from '@/components/Common/SnackbarMessage';
import Ckeditor from '@/components/Common/Ckeditor';
import { FaTrash } from 'react-icons/fa';
import { LuFileText } from 'react-icons/lu';

export default function CreatePost({
    refresh,
    setRefresh,
}: {
    categories: object[];
    refresh: boolean;
    setRefresh: any;
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
    // Trạng thái sau khi thêm bài viết
    const [status, setStatus] = useState<string>('');
    //
    const [turnUploadFiles, setTurnUploadFiles] = useState<boolean>(false);
    //
    const [files, setFiles] = useState<object[]>([]);
    //

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
                const formData: any = new FormData();
                formData.append('user_id', dataContext.id);
                formData.append('title', title);
                formData.append('content', content);
                formData.append('image', image, image.name);
                formData.append('serial_number', serial);
                formData.append('Issuance_date', issuance);
                const result = await axios.post(`${serverBackend}/api/v1/post`, formData);
                if (result.data.message === 'success') {
                    setTurn(false);
                    setRefresh(!refresh);
                    setStatus('success');
                }
            }
        } catch {
            alert('Khong the post');
        }
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

    const handleGetFile = async (e: any) => {
        try {
            const file = e.target.files[0];
            if (file) {
                const name: string = file.name;
                setFiles([
                    ...files,
                    {
                        nameFile: name,
                    },
                ]);
                const formData = new FormData();
                formData.append('files', file);
                const result = await axios.post(`${serverBackend}/api/v1/uploadPostFile`, formData);
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteAllFiles = () => {
        setFiles([]);
    };

    const deleteFile = (nameFile: string) => {
        setFiles(files.filter((item: any) => item.nameFile !== nameFile));
    };

    return (
        <>
            {status === 'success' && <SnackbarMessage type={1} title="Thêm bài đăng thành công" />}
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
                            {/* <Dropdown>
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
                                    {categories.map((item: any, index: number) => (
                                        <SelectItem onClick={() => setCategory(item.name)} key={index}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown> */}
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
                        <Ckeditor content={content} setContent={setContent} />
                        <input onChange={(e) => handleUploadImg(e)} id="uploadImg" type="file" hidden />
                        <Button onClick={() => setTurnUploadFiles(true)} color="default" className="w-full p-4">
                            <div className="w-full h-full flex items-center cursor-pointer justify-center">
                                <BiUpload color={'black'} fontSize={20} />
                                Thêm tài liệu
                            </div>
                        </Button>
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
            <Modal
                style={{ height: 400, overflow: 'auto' }}
                size="xl"
                isOpen={turnUploadFiles}
                onOpenChange={() => setTurnUploadFiles(false)}
                isDismissable={false}
                backdrop="blur"
                hideCloseButton
            >
                <ModalContent>
                    <ModalBody className="flex flex-col">
                        <div className="flex h-[40px] justify-between items-center border-b-[1px] border-[#ccc]">
                            <h2 className="font-bold">Chọn tài liệu</h2>
                        </div>
                        <div className="flex flex-col">
                            {files.map((item: any, index: number) => (
                                <div className="flex justify-between gap-2 py-2">
                                    <div className="flex items-center gap-1 text-[13px]">
                                        <LuFileText fontSize={20} />
                                        <span className="translate-y-[1px]">{item.nameFile}</span>
                                    </div>
                                    <i onClick={() => deleteFile(item.nameFile)} className="cursor-pointer">
                                        <AiOutlineClose fontSize={12} />
                                    </i>
                                </div>
                            ))}
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex justify-between">
                        <input hidden onChange={(e) => handleGetFile(e)} type="file" id="uploadFile" />
                        <div className="h-full flex gap-2 w-full items-center">
                            <label htmlFor="uploadFile" className="h-full flex gap-1 cursor-pointer items-center">
                                <AiFillFileAdd fontSize={20} />
                                Thêm tài liệu
                            </label>
                            <div onClick={() => deleteAllFiles()} className="flex gap-1 items-center cursor-pointer">
                                <FaTrash fontSize={20} />
                                Xóa tất cả
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button color="danger" variant="light" onClick={() => setTurnUploadFiles(false)}>
                                Đóng
                            </Button>
                            <Button color="primary">Thêm</Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
