import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function ChangeStatus({
    children,
    type,
    method,
    idUser,
    idArticle,
}: {
    children: React.ReactNode;
    type: string;
    method: string;
    idUser?: string;
    idArticle?: string;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handeSubmit = () => {
        switch (type) {
            case 'account':
                return alert(`idUser: ${idUser}, method: ${method}`);
            case 'article':
                return alert(`article: ${idArticle}, method: ${method}`);
            default:
                return;
        }
    };

    return (
        <>
            <div onClick={onOpen} color="primary">
                {children}
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="py-4 text-[20px] ">
                                    Bạn có muốn tắt trạng thái của tài khoản này không?
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
