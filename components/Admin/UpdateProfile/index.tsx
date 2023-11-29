'use client';

import React, { useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Tooltip } from '@nextui-org/react';

import { serverBackend, serverImages } from '@/server';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import axios from 'axios';

export default function UpdateProfile({ user }: { user: any }) {
    const [turn, setTurn] = useState<boolean>(false);
    const [pass, setPass] = useState<any>('');

    const handleSubmit = async () => {
        try {
            alert(pass);
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            <Tooltip content="Đổi mật khẩu">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <HiMiniPencilSquare />
                </i>
            </Tooltip>
            <Modal size="lg" isOpen={turn} onOpenChange={() => setTurn(false)} isDismissable={false}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Đổi mật khẩu</ModalHeader>
                    <ModalBody>
                        <Input onChange={(e) => setPass(String(e.target.value))} type="text" label="Mật khẩu mới" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => setTurn(false)}>
                            Đóng
                        </Button>
                        <Button color="primary" onPress={() => handleSubmit()}>
                            Đồng ý
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
