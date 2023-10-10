'use client';

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const router = useRouter();

    const [hidePass, setHidePass] = useState<boolean>(true);

    const handleSubmit = async () => {
        if (email.length > 0 && pass.length > 0) {
            const result = await axios.post('https://5aa4-2a09-bac1-7ac0-10-00-246-17.ngrok-free.app/api/v1/login', {
                email: email,
                password: pass,
            });
            if (result.data.status === 'success') {
                localStorage.setItem('access_token', result.data.authorisation.token);
                router.push('/admin/dashboard');
            } else {
                alert('Deo dung tai khoan');
            }
        }
    };

    return (
        <div>
            <Modal backdrop="blur" hideCloseButton isOpen placement="top-center">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Đăng nhập</ModalHeader>
                    <ModalBody>
                        <Input
                            autoFocus
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
                </ModalContent>
            </Modal>
        </div>
    );
}
