'use client';

import { useState, useEffect } from 'react';
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from '@nextui-org/react';
import Image from 'next/image';
import { BsFillTrashFill, BsPlusCircle } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';
import axios from 'axios';
import { serverBackend } from '@/server';
import { formatTime } from '@/functions/formatTime';
import { AiOutlinePlus } from 'react-icons/ai';
import ChangeStatus from '../ChangeStatus';
import Delete from '../Delete';

export default function BannersAdmin() {
    const [banners, setBanners] = useState<object[]>([]);
    const [imageUrl, setImageUrl] = useState<any>('');
    const [status, setStatus] = useState<any>('active');
    const [imageFile, setImageFile] = useState<any>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [turnUpload, setTurnUpload] = useState<boolean>(false);

    useEffect(() => {
        document.title = 'Quản lý Banners';
    }, []);

    const getBanners = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/getBanner`);
            if (result.data.message === 'success') {
                setBanners(result.data.data);
            }
        } catch (error) {
            console.error('Error fetching banner images:', error);
        }
    };

    useEffect(() => {
        getBanners();
    }, [refresh]);

    const handleAddBanner = async () => {
        try {
            const formData = new FormData();
            formData.append('images', imageFile);
            formData.append('status', status);
            const result = await axios.post(`${serverBackend}/api/v1/bannerImages`, formData);
            console.log(result);
            if (result.data.message === 'success') {
                setRefresh(!refresh);
                setTurnUpload(false);
                handleCancleUpload();
            }
        } catch (error) {
            console.log('Lỗi add banner');
        }
    };

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancleUpload = () => {
        setImageFile(null);
    };

    return (
        <div className="flex w-full px-4 mt-4 justify-center">
            <div className="flex w-full flex-col gap-3">
                <div className="flex justify-end">
                    <div className="flex gap-2">
                        <Button color="primary" className="w-[170px]" onPress={() => setTurnUpload(true)}>
                            <i className="shrink-0">
                                <BsPlusCircle fontSize={20} />
                            </i>
                            Thêm Banner
                        </Button>
                    </div>
                </div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>Banner</TableColumn>
                        <TableColumn>Trạng thái</TableColumn>
                        <TableColumn>Ngày tạo</TableColumn>
                        <TableColumn>Ngày cập nhật</TableColumn>
                        <TableColumn>Công cụ</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {banners.map((item: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="whitespace-nowrap">{item.id}</TableCell>
                                <TableCell>
                                    <div className="w-[200px] h-[150px] relative">
                                        <Image src={`${item.image_url}`} alt={item.image_url} fill sizes="100000px" />
                                    </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {item.status === 'active' ? (
                                        <Chip color="primary">Hoạt động</Chip>
                                    ) : (
                                        <Chip>Không hoạt động</Chip>
                                    )}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">{formatTime(item.created_at)}</TableCell>
                                <TableCell className="whitespace-nowrap">{formatTime(item.updated_at)}</TableCell>
                                <TableCell className="whitespace-nowrap">
                                    <div className="flex gap-2">
                                        {item.status === 'inactive' && (
                                            <Delete
                                                idBanner={item.id}
                                                type="banner"
                                                refresh={refresh}
                                                setRefresh={setRefresh}
                                            />
                                        )}
                                        <ChangeStatus
                                            idBanner={item.id}
                                            type="banner"
                                            status={item.status}
                                            refresh={refresh}
                                            setRefresh={setRefresh}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Modal hideCloseButton isOpen={turnUpload}>
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">Tải lên Banner</ModalHeader>
                        <ModalBody>
                            <input hidden id="uploadBanner" type="file" onChange={handleImageUpload} />
                            <div className="flex w-full h-[300px] relative">
                                {imageFile ? (
                                    <Image src={imageFile} fill sizes="1000000px" alt="" />
                                ) : (
                                    <label
                                        htmlFor="uploadBanner"
                                        className="flex cursor-pointer w-full h-full p-4 border-[1px] border-dashed border-[#515151] items-center justify-center"
                                    >
                                        <AiOutlinePlus color="#515151" fontSize={100} />
                                    </label>
                                )}
                            </div>
                            {imageFile && (
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button color="primary" className="w-full">
                                            {status === 'active' && 'Hoạt động'}
                                            {status === 'inactive' && 'Không hoạt động'}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions">
                                        <DropdownItem onClick={() => setStatus('active')} key="Active">
                                            Hoạt động
                                        </DropdownItem>
                                        <DropdownItem onClick={() => setStatus('inactive')} key="Inactive">
                                            Không hoạt động
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={() => {
                                    setTurnUpload(false);
                                    handleCancleUpload();
                                }}
                            >
                                Đóng
                            </Button>
                            <Button color="primary" onClick={() => handleAddBanner()}>
                                Đồng ý
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
