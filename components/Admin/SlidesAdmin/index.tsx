'use client';

import { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import Image from 'next/image';
import { BsFillTrashFill, BsPlusCircle } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';

export default function BannersAdmin() {
    const [banners, setBanners] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [status, setStatus] = useState('active');


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


    const handleAddBanner = () => {
        // Gửi yêu cầu POST để thêm banner vào API
        // Thực hiện gửi yêu cầu POST vào đây
        // Sau khi thêm thành công, cập nhật danh sách banner
    };

    const handleDeleteBanner = (id) => {
        // Gửi yêu cầu DELETE để xóa banner với ID cụ thể
        // Thực hiện gửi yêu cầu DELETE vào đây
        // Sau khi xóa thành công, cập nhật danh sách banner
    };

    const handleUpdateBanner = (id) => {
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
                            type="text"
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
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
                        {banners.map((banner) => (
                            <TableRow key={banner.id}>
                                <TableCell>
                                    <div className="w-[100px] h-[100px] relative">
                                        <Image src={banner.image_url} alt={banner.image_url} fill sizes="100000px" />
                                    </div>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <i>
                                            <BsFillTrashFill fontSize={20} onClick={() => handleDeleteBanner(banner.id)} />
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

