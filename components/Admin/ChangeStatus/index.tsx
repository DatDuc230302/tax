'use client';
import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import { LiaExchangeAltSolid } from 'react-icons/lia';

export default function ChangeStatus({
    type,
    idUser,
    idPost,
    status,
    refresh,
    setRefresh,
}: {
    type: string;
    idUser?: string;
    idPost?: string;
    status: string;
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);

    const handeSubmit = () => {
        switch (type) {
            case 'account':
                return changeStatusAccount();
            case 'post':
                return changeStatusPost();
            default:
                return;
        }
    };

    const changeStatusAccount = async () => {
        try {
            const formData: any = new FormData();
            formData.append('id', String(idUser));
            const result = await axios.post(`${serverBackend}/api/v1/userStatus`, formData);
            if (result.data.message === 'success') {
                setRefresh(!refresh);
                setTurn(false);
            }
        } catch {
            console.log('Lỗi');
        }
    };

    const changeStatusPost = async () => {
        try {
            const result = await axios.post(`${serverBackend}/api/v1/postStatus`, {
                id: idPost,
            });
            if (result.data.message === 'success') {
                setTurn(false);
                setRefresh(!refresh);
            }
        } catch {}
    };

    return (
        <>
            <Tooltip color="primary" content="Thay đổi trạng thái">
                <div onClick={() => setTurn(true)}>
                    <LiaExchangeAltSolid className={'cursor-pointer'} fontSize={20} />
                </div>
            </Tooltip>
            <Modal backdrop="blur" isOpen={turn} onOpenChange={() => setTurn(false)} placement="top-center">
                <ModalContent>
                    <ModalBody className="p-5 w-max">
                        <div className="pt-4 text-[20px]">
                            <span className="flex flex-col gap-1">
                                Xác nhận chuyển trạng thái thành
                                <b>{status === 'active' ? 'Không hoạt động' : 'Hoạt động'}</b>
                            </span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onClick={() => setTurn(false)}>
                            Hủy
                        </Button>
                        <Button onClick={() => handeSubmit()} color="primary">
                            Đồng ý
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
