'use client';
import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import { LiaExchangeAltSolid } from 'react-icons/lia';

export default function ChangeStatus({
    type,
    status,
    idUser,
    refresh,
    setRefresh,
}: {
    type: string;
    status: string;
    idUser?: string;
    idArticle?: string;
    refresh: boolean;
    setRefresh: any;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handeSubmit = () => {
        switch (type) {
            case 'account':
                return changeStatusAccount();
            case 'posts':
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
            }
        } catch {
            console.log('Lỗi');
        }
    };

    const changeStatusPost = async () => {
        alert('Post đây');
    };

    return (
        <>
            <Tooltip color="primary" content="Thay đổi trạng thái">
                <div onClick={onOpen} color="primary">
                    <LiaExchangeAltSolid className={'cursor-pointer'} fontSize={20} />
                </div>
            </Tooltip>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-5">
                                <div className="pt-4 text-[20px]">
                                    <span className="flex gap-1">
                                        Xác nhận chuyển trạng thái thành
                                        <b>{status === 'active' ? 'Không hoạt động' : 'Hoạt động'}</b>
                                    </span>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Hủy
                                </Button>
                                <Button onPress={handeSubmit} color="primary">
                                    Đồng ý
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
