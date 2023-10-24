'use client';

import React, { useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Tooltip } from '@nextui-org/react';

import { serverBackend, serverImages } from '@/server';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import axios from 'axios';

export default function UpdateProfile({}: {}) {
    const [turn, setTurn] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const handleSubmit = async () => {};

    return (
        <>
            <Tooltip content="Sửa thông tin">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <HiMiniPencilSquare />
                </i>
            </Tooltip>
            <Modal size="lg" isOpen={turn} onOpenChange={() => setTurn(false)} isDismissable={false}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Cập nhật thông tin</ModalHeader>
                    <ModalBody>
                        <Input type="text" label="Họ và tên" />
                        <Input type="text" label="Email" />
                        <Input type="text" label="Số điện thoại" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => setTurn(false)}>
                            Đóng
                        </Button>
                        <Button color="primary" onPress={() => handleSubmit()}>
                            Thêm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
