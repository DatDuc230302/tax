'use client';

import { useState, useEffect } from 'react';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import Image from 'next/image';
import { BsFillTrashFill, BsPlusCircle } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function BannersAdmin() {
    const [banners, setBanners] = useState<any>([]);
    const [imageUrl, setImageUrl] = useState<any>('');
    const [status, setStatus] = useState<any>('active');
    const [imageFile, setImageFile] = useState<any>(null);
    const [imageShow, setImageShow] = useState<any>(null);

    // Function to fetch banner images from the API
    const fetchBannerImages = async () => {
        try {
            const response = await fetch('/api/v1/banner-images');
            const data = await response.json();
            setImageUrl(data);
        } catch (error) {
            console.error('Error fetching banner images:', error);
        }
    };

    useEffect(() => {
        fetchBannerImages();
    }, []);

    const handleAddBanner = async () => {
        try {
            const newBanner = {
                image_url: imageUrl,
            };

            await axios.post(serverBackend, newBanner);
            fetchBannerImages(); // Sau khi thêm thành công, cập nhật danh sách banner
        } catch (error) {
            console.error('Error adding banner:', error);
        }
    };

    const handleDeleteBanner = async (id: any) => {
        try {
            await axios.delete(`${serverBackend}/api/v1/banner-images/${id}`);
            fetchBannerImages(); // Sau khi xóa thành công, cập nhật danh sách banner
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const handleUpdateBanner = async (id: any) => {
        try {
            const updatedBanner = {
                image_url: imageUrl,
                status: status,
            };

            await axios.put(`${serverBackend}/api/v1/banner-images/${id}`, updatedBanner);
            fetchBannerImages(); // Sau khi cập nhật thành công, cập nhật danh sách banner
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                setImageUrl(event.target.result);
            };
            reader.onloadend = () => {
                setImageShow(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setImageShow('');
    };

    return (
        <div className="flex w-full px-4 mt-4 justify-center">
            <div className="flex w-full flex-col gap-3">
                <div className="flex justify-end">
                    <div className="flex gap-2">
                        <input hidden id="uploadBanner" type="file" onChange={handleImageUpload} />
                        {/* <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select> */}
                        <Dropdown>
                            <DropdownTrigger>
                                <Button color="primary" className="w-[170px]">
                                    {status}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem onClick={() => setStatus('active')} key="Active">
                                    Active
                                </DropdownItem>
                                <DropdownItem onClick={() => setStatus('inactive')} key="Inactive">
                                    Inactive
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" className="w-[170px]">
                            <label htmlFor="uploadBanner" className="flex gap-2 cursor-pointer">
                                <i className="shrink-0">
                                    <BsPlusCircle fontSize={20} />
                                </i>
                                Chọn Banner
                            </label>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center">
                    {imageShow && (
                        <div className="flex flex-col gap-2">
                            <div className="w-[300px] relative h-[300px]">
                                <Image src={imageShow} alt="" fill sizes="10000000px" />
                            </div>
                            <div className="flex gap-2 justify-center">
                                <Button>Tải lên</Button>
                                <Button onClick={() => handleDeleteImage()}>Hủy</Button>
                            </div>
                        </div>
                    )}
                </div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>BANNER</TableColumn>
                        <TableColumn>TOOLS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {banners.map((banner: any) => (
                            <TableRow key={banner.id}>
                                <TableCell>
                                    <div className="w-[100px] h-[100px] relative">
                                        <Image src={banner.image_url} alt={banner.image_url} fill sizes="100000px" />
                                    </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <i>
                                            <BsFillTrashFill
                                                fontSize={20}
                                                onClick={() => handleDeleteBanner(banner.id)}
                                            />
                                        </i>
                                        <i>
                                            <MdRestore fontSize={20} onClick={() => handleUpdateBanner(banner.id)} />
                                        </i>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
