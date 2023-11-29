import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from '@nextui-org/react';
import React, { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

export default function DetailPost({ postHistory }: { postHistory: any }) {
    const [turn, setTurn] = useState<boolean>(false);
    const oldData: any = postHistory[0].previous_data ? JSON.parse(postHistory[0].previous_data) : null;
    const newData: any = postHistory[0].updated_data ? JSON.parse(postHistory[0].updated_data) : null;

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
                <div className="flex h-full w-full justify-between py-2">
                    <div className="flex w-[50%] flex-col">
                        <h2 className="w-full font-bold text-[20px] flex justify-center">Dữ liệu cũ</h2>
                        <div className="gap-2 flex flex-col">
                            <span>{oldData.title}</span>
                            <span>{oldData.short_desc}</span>
                        </div>
                    </div>
                    <div className="flex w-[50%] flex-col">
                        <h2 className="w-full font-bold text-[20px] flex justify-center">Dữ liệu mới</h2>
                        <div className="gap-2 flex flex-col">
                            <span>{oldData.title}</span>
                            <span>{oldData.short_desc}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
