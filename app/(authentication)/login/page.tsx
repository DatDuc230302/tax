'use client';

import {
    Button,
    Chip,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
} from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { serverBackend } from '@/server';
import { loadingApi } from '@/functions/loadingApi';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [hidePass, setHidePass] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    const router = useRouter();

    const handleSubmit = loadingApi(async () => {
        try {
            if (email.length > 0 && pass.length > 0) {
                const result = await axios.post(`${serverBackend}/api/v1/login`, {
                    email: email,
                    password: pass,
                });
                if (result.data.status === 'success') {
                    console.log(result);
                    const currentUser: object = {
                        name: result.data.user.name,
                        role: result.data.user.role,
                        token: result.data.authorization.token,
                    };
                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                    setStatus('success');
                    router.push('/admin/dashboard');
                } else {
                    alert('Deo dung tai khoan');
                }
            }
        } catch {
            console.log('Loi ');
        }
    }, setLoading);

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && handleSubmit();
    };

    const renderUI = () => {
        switch (status) {
            case '':
                return (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Đăng nhập</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                variant="flat"
                                type="text"
                                onChange={(e) => e.target.value[0] !== ' ' && setEmail(e.target.value)}
                                value={email}
                            />
                            <div className="relative">
                                <Input
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    type={hidePass ? 'password' : 'text'}
                                    variant="flat"
                                    value={pass}
                                    onChange={(e) => e.target.value[0] !== ' ' && setPass(String(e.target.value))}
                                    onKeyDown={(e) => handleOnKeyDown(e)}
                                />
                                <div className="h-full pr-3 items-center flex absolute bottom-0 right-0">
                                    {hidePass ? (
                                        <AiFillEye
                                            fontSize={20}
                                            className="cursor-pointer"
                                            onClick={() => setHidePass(false)}
                                        />
                                    ) : (
                                        <AiFillEyeInvisible
                                            className="cursor-pointer"
                                            onClick={() => setHidePass(true)}
                                            fontSize={20}
                                        />
                                    )}
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat">
                                <Link className="text-red" href="/">
                                    Trang trủ
                                </Link>
                            </Button>
                            <Button onClick={() => handleSubmit()} color="primary">
                                Đăng nhập
                            </Button>
                        </ModalFooter>
                    </>
                );
            case 'success':
                return (
                    <ModalBody>
                        <div className="h-[255px] select-none items-center gap-4 flex flex-col justify-center">
                            <Chip color="primary" className="p-5 select-none">
                                Đăng nhập thành công
                            </Chip>
                        </div>
                    </ModalBody>
                );
        }
    };

    return (
        <div>
            <Modal backdrop="blur" hideCloseButton isOpen placement="top-center">
                <ModalContent>
                    {loading ? (
                        <ModalBody>
                            <div className="h-[255px] select-none items-center gap-4 flex flex-col justify-center">
                                <Spinner size="lg" />
                                <span>Vui lòng chờ trong giây lát</span>
                            </div>
                        </ModalBody>
                    ) : (
                        renderUI()
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
