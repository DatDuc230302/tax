import React from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

export default function DeleteStatus({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                <Button color="primary" onPress={onClose}>
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
