'use client';

import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import { BsPencilSquare } from 'react-icons/bs';
import Image from 'next/image';
import { isEmail } from '@/functions/isEmail';
import AlertDialog from '../../Common/AlertMessage';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import SnackbarMessage from '@/components/Common/SnackbarMessage';

export default function CreateUser({ refresh, setRefresh }: { refresh: boolean; setRefresh: any }) {
    const [turn, setTurn] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [require, setRequire] = useState<boolean>(false);
    const [existEmail, setExistEmail] = useState<boolean>(false);
    const [networkError, setNetworkError] = useState<boolean>(false);

    const clearAllInputs = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPass('');
        setConfirmPass('');
    };

    const handleSubmit = async () => {
        try {
            if (
                name.length === 0 ||
                email.length === 0 ||
                phone.length === 0 ||
                pass.length === 0 ||
                confirmPass.length === 0
            ) {
                setRequire(true);
            } else {
                const formData: any = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('password', pass);
                const result: any = await axios.post(`${serverBackend}/api/v1/register`, formData);
                if (result.data.status === 'success') {
                    setRefresh(!refresh);
                    setTurn(false);
                    clearAllInputs();
                }
            }
        } catch (err: any) {
            if (err.message === 'Network Error') {
                setNetworkError(true);
            }
        }
    };

    return (
        <>
            {networkError && <SnackbarMessage title="Không kết nối được đến máy chủ" type={4} />}
            <Button
                className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                onClick={() => setTurn(true)}
            >
                <AiOutlinePlusCircle fontSize={20} />
                Thêm tài khoản
            </Button>
            {existEmail && (
                <AlertDialog title="Thông báo" content="Email này đã có người sử dụng vui lòng tạo email khác" />
            )}
            <Modal
                backdrop="blur"
                className="z-20"
                isOpen={turn}
                onOpenChange={() => setTurn(false)}
                placement="top-center"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Tạo tài khoản</ModalHeader>
                    <ModalBody>
                        <Input
                            autoFocus
                            label="Tên"
                            variant="flat"
                            value={name}
                            errorMessage={require && name.length === 0 && 'Vui lòng nhập tên'}
                            onChange={(e) => setName(String(e.target.value))}
                        />
                        <Input
                            type="email"
                            label="Nhập email"
                            variant="flat"
                            isInvalid={false}
                            errorMessage={
                                require &&
                                (email.length === 0
                                    ? 'Vui lòng nhập email'
                                    : !isEmail(email) && 'vui lòng nhập đúng email')
                            }
                            className="w-full"
                            value={email}
                            onChange={(e) => setEmail(String(e.target.value))}
                        />
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(String(e.target.value))}
                            label="Số điện thoại"
                            variant="flat"
                            type="number"
                            errorMessage={require && phone.length === 0 && 'Vui lòng số điện thoại'}
                        />
                        <Input
                            value={pass}
                            onChange={(e) => setPass(String(e.target.value))}
                            label="Mật khẩu"
                            type="password"
                            variant="flat"
                            errorMessage={require && pass.length === 0 && 'Vui lòng nhập mật khẩu'}
                        />
                        <Input
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(String(e.target.value))}
                            label="Nhập lại Mật khẩu"
                            type="password"
                            variant="flat"
                            errorMessage={require && confirmPass.length === 0 && 'Vui lòng nhập lại mật khẩu'}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onClick={() => setTurn(false)}>
                            Đóng
                        </Button>
                        <Button onClick={() => handleSubmit()} color="primary">
                            Tạo
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
