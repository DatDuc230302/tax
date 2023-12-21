'use client';

import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function SettingHeader({ data, setData, updateData }: { data: any; setData: any; updateData: any }) {
    const [imageFile, setImageFile] = useState<any>(null);

    const handleUploadImg = (e: any) => {
        const file = e.target.files[0];
        const reader: any = new FileReader();

        reader.onloadend = () => {
            setImageFile(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
        }
    };

    useEffect(() => {
        if (imageFile) {
            setData({
                ...data,
                header_bg: imageFile,
            });
        }
    }, [imageFile]);

    return (
        <div className="flex w-full">
            <div className="flex flex-col gap-2">
                <div className="relative w-[200px] h-[200px]">
                    {imageFile && <Image className="object-cover" src={imageFile} alt="" fill sizes="100000px" />}
                    {!imageFile && data.header_bg && (
                        <Image className="object-cover" src={data.header_bg} alt="" fill sizes="100000px" />
                    )}
                </div>
                <Button className="cursor-pointer p-0">
                    <label
                        htmlFor="uploadImg"
                        className="flex justify-center cursor-pointer items-center w-full h-full"
                    >
                        Thay ảnh Header
                    </label>
                </Button>
                <input onChange={(e) => handleUploadImg(e)} id="uploadImg" type="file" hidden />
                <Button color="primary" onClick={updateData}>
                    Cập nhật Header
                </Button>
            </div>
        </div>
    );
}
