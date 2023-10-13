import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

export default function NoneRole() {
    return (
        <Modal isOpen hideCloseButton placement="top-center">
            <ModalContent className="h-[300px]">
                <span className="flex w-full h-[100px] items-center justify-center text-[30px] ">Thông báo</span>
                <ModalBody>
                    <span className="flex justify-center">Bạn không có quyền truy cập vào trang này.</span>
                </ModalBody>
                <ModalFooter>
                    <Link href={'/'}>
                        <Button color="primary">Về trang trủ</Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
