'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NoneRole() {
    const router = useRouter();
    return (
        <Modal isOpen hideCloseButton placement="top-center">
            <ModalContent className="">
                <span className="flex w-full h-[100px] items-center justify-center text-[30px] pt-2 ">Thông báo</span>
                <ModalBody>
                    <span className="flex justify-center">Bạn không đủ quyền để truy cập vào trang này.</span>
                    <span className="flex justify-center">Vui lòng liên hệ với người quản trị để biết thêm.</span>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={() => router.back()} color="primary">
                        Về trang trước
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
