'use client';

import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import Image from 'next/image';
import { BsFillTrashFill, BsPlusCircle } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function BannersAdmin() {
    const [banners, setBanners] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [status, setStatus] = useState('active');
    const [imageFile, setImageFile] = useState(null);

     const fetchBannerImages = async () => {
        try {
            const response = await axios.get(`${serverBackend}/api/v1/banner-images`);
            setBanners(response.data);
    const [banners, setBanners] = useState<any>([]);
    const [imageUrl, setImageUrl] = useState<any>('');
    const [status, setStatus] = useState<any>('active');

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

    const handleDeleteBanner = async (id:any) => {
        try {
            await axios.delete(`${serverBackend}/api/v1/banner-images/${id}`);
            fetchBannerImages(); // Sau khi xóa thành công, cập nhật danh sách banner
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const handleUpdateBanner = async (id:any) => {
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
            reader.onload = (event) => {
                setImageFile(file);
                setImageUrl(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    const handleAddBanner = () => {
        // Gửi yêu cầu POST để thêm banner vào API
        // Thực hiện gửi yêu cầu POST vào đây
        // Sau khi thêm thành công, cập nhật danh sách banner
    };

    const handleDeleteBanner = (id: any) => {
        // Gửi yêu cầu DELETE để xóa banner với ID cụ thể
        // Thực hiện gửi yêu cầu DELETE vào đây
        // Sau khi xóa thành công, cập nhật danh sách banner
    };

    const handleUpdateBanner = (id: any) => {
        // Gửi yêu cầu PUT để cập nhật thông tin banner với ID cụ thể
        // Thực hiện gửi yêu cầu PUT vào đây
        // Sau khi cập nhật thành công, cập nhật danh sách banner
    };
    return (
         <div className="flex w-full px-4 mt-4 justify-center">
            <div className="flex w-full flex-col gap-3">
                <div className="flex justify-end">
                    <div className="flex gap-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <Button color="primary" className="w-[170px]" onClick={handleAddBanner}>
                            <i className="shrink-0">
                                <BsPlusCircle fontSize={20} />
                            </i>
                            Thêm Banner
                        </Button>
                    </div>
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
        }