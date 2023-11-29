'use client';

import React, { useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Tooltip } from '@nextui-org/react';

import { HiMiniPencilSquare } from 'react-icons/hi2';
import { serverBackend } from '@/server';
import axios from 'axios';
import AlertDialog from '@/components/Common/AlertDialog';
import SnackbarTimeout from '@/components/Common/SnackbarTimeout';

export default function UpdateProfile({ user }: { user: any }) {
    const [turn, setTurn] = useState<boolean>(false);
    const [oldPass, setOldPass] = useState<string>('');
    const [newPass, setNewPass] = useState<any>('');
    const [turnMessage, setTurnMessage] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('current_password', oldPass);
            formData.append('new_password', newPass);
            const res = await axios.post(`${serverBackend}/api/v1/updatePassword`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (res.data.message === 'success') {
                setTurnMessage(true);
                setTurn(false);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            <SnackbarTimeout turn={turnMessage} setTurn={setTurnMessage} title="Đổi mật khẩu thành công" />
            <Tooltip content="Đổi mật khẩu">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <HiMiniPencilSquare />
                </i>
            </Tooltip>
            <Modal size="lg" isOpen={turn} onOpenChange={() => setTurn(false)} isDismissable={false}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Đổi mật khẩu</ModalHeader>
                    <ModalBody>
                        <Input onChange={(e) => setOldPass(String(e.target.value))} type="text" label="Mật khẩu cũ" />
                        <Input onChange={(e) => setNewPass(String(e.target.value))} type="text" label="Mật khẩu mới" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => setTurn(false)}>
                            Đóng
                        </Button>
                        <Button color="primary" onClick={() => handleSubmit()}>
                            Đồng ý
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
