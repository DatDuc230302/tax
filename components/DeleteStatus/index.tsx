import React from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function DeleteStatus({ children, idUser }: { children: React.ReactNode; idUser: string }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const deleteUser = async () => {
        try {
            const result = await axios.delete(`${serverBackend}/api/v1/user`, {
                params: {
                    id: String(idUser),
                },
            });
            console.log(result);
        } catch {
            console.log('Lỗi');
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
                                <Button color="primary" onClick={() => deleteUser()}>
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
