import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function Delete({
    children,
    type,
    idUser,
    idArticle,
}: {
    children: React.ReactNode;
    type: string;
    idUser?: string;
    idArticle?: string;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handeSubmit = () => {
        switch (type) {
            case 'account':
                return alert(`idUser: ${idUser}, method: ${status}`);
            case 'article':
                return alert(`article: ${idArticle}, method: ${status}`);
            default:
                return;
        }
    };

    return (
        <>
            <Tooltip color="primary" content="Xóa tài khoản">
                <div className="cursor-pointer" onClick={onOpen} color="primary">
                    {children}
                </div>
            </Tooltip>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-5">
                                <div className="pt-4 text-[20px]">
                                    <span className="flex gap-1">Xác nhận chuyển trạng thái thành</span>
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
