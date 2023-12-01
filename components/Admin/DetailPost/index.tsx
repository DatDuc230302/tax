import { Input, Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

export default function DetailPost({ postHistory }: { postHistory: any }) {
    const [turn, setTurn] = useState<boolean>(false);
    const oldData: any = postHistory[0].previous_data ? JSON.parse(postHistory[0].previous_data) : null;
    const newData: any = postHistory[0].updated_data ? JSON.parse(postHistory[0].updated_data) : null;

    console.log(oldData);

    return (
        <>
            <Tooltip content="Xem chi tiết dữ liệu">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <BsInfoCircle fontSize={20} />
                </i>
            </Tooltip>
            <div
                className={`${
                    turn ? 'flex' : 'hidden'
                } z-[50000000000] fixed flex-col right-0 left-0 top-[70px] bottom-0 bg-white p-4`}
            >
                <div>
                    <i className="cursor-pointer" onClick={() => setTurn(false)}>
                        <IoCloseSharp fontSize={30} />
                    </i>
                </div>
                <div className="flex h-full w-full justify-between py-2 gap-4">
                    <div className="flex w-[50%] flex-col">
                        <h2 className="w-full font-bold text-[20px] flex justify-center">Dữ liệu cũ</h2>
                        <div className="gap-2 flex flex-col py-2">
                            <Input disabled label="Tiêu đề bài viết" value={oldData.title} />
                            <Input disabled label="Nội dụng ngắn" value={oldData.short_desc} />
                            <div className="flex gap-3">
                                <Input disabled label="Ngày ban hành" value={oldData.Inssuance_date} />
                                <Input disabled label="Số hiệu" value={oldData.serial_number} />
                            </div>
                            <Input
                                disabled
                                label="Trang thái"
                                value={oldData.status === 'inactive' ? 'Không hoạt dộng' : 'Hoạt động'}
                            />
                            <span>Ảnh đại diện</span>
                            <div className="w-full relative h-[300px]">
                                {oldData.images && <Image src={oldData.images} alt="" fill sizes="100000px" />}
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[50%] flex-col">
                        <h2 className="w-full font-bold text-[20px] flex justify-center">Dữ liệu mới</h2>
                        <div className="gap-2 flex flex-col py-2">
                            <Input disabled label="Tiêu đề bài viết" value={oldData.title} />
                            <Input disabled label="Nội dụng ngắn" value={oldData.short_desc} />
                            <div className="flex gap-3">
                                <Input disabled label="Ngày ban hành" value={oldData.Inssuance_date} />
                                <Input disabled label="Số hiệu" value={oldData.serial_number} />
                            </div>
                            <Input
                                disabled
                                label="Trang thái"
                                value={oldData.status === 'inactive' ? 'Không hoạt dộng' : 'Hoạt động'}
                            />
                            <span>Ảnh đại diện</span>
                            <div className="w-full relative h-[300px]">
                                {oldData.images && <Image src={oldData.images} alt="" fill sizes="100000px" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
