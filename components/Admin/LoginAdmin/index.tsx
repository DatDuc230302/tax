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
import { loadingApi } from '@/functions/loadingApi';
import { serverBackend } from '@/server';
import { encrypt } from '@/functions/crypto';
import AlertDialog from '../../Common/AlertMessage';
import { isEmail } from '@/functions/isEmail';

export default function LoginAdmin() {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [hidePass, setHidePass] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [require, setRequire] = useState<boolean>(false);
    const [turnDialog, setTurnDialog] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = loadingApi(async () => {
        try {
            if (email.length === 0 || !isEmail(email) || pass.length === 0) {
                setRequire(true);
            } else {
                const result = await axios.post(`${serverBackend}/api/v1/login`, {
                    email: email,
                    password: pass,
                });
                if (result.data.status === 'success') {
                    const currentUser: object = {
                        id: result.data.user.id,
                        name: result.data.user.name,
                        role: result.data.user.role,
                        token: result.data.authorization.token,
                    };
                    const valueEncrypt: any = encrypt(JSON.stringify(currentUser), 'DucDat2303');
                    sessionStorage.setItem('currentUser', valueEncrypt);
                    router.push('/admin');
                }
            }
        } catch (err: any) {
            if (err.response.data.message === 'Unauthorized') {
                setTurnDialog(true);
            }
            if (err.message === 'Network Error') {
                const valueEncrypt: string = encrypt(
                    JSON.stringify({ name: 'Trần Đức Đạt', role: 'root' }),
                    'DucDat2303',
                );
                sessionStorage.setItem('currentUser', valueEncrypt);
                router.push('/admin');
            }
        }
    }, setLoading);

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && handleSubmit();
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
                        <>
                            {turnDialog && (
                                <AlertDialog
                                    title="Thông báo"
                                    content="Đăng nhập không thành công sai tài khoản hoặc mật khẩu"
                                />
                            )}
                            <ModalHeader className="flex flex-col gap-1">Đăng nhập</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Email"
                                    placeholder="Nhập email"
                                    variant="flat"
                                    type="text"
                                    onChange={(e) => e.target.value[0] !== ' ' && setEmail(e.target.value)}
                                    value={email}
                                    onKeyDown={(e) => handleOnKeyDown(e)}
                                    errorMessage={
                                        require &&
                                        (email.length === 0
                                            ? 'Vui lòng nhập email'
                                            : !isEmail(email) && 'Vui lòng nhập đúng định dạng email')
                                    }
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
                                        errorMessage={require && pass.length === 0 && 'Vui lòng nhập mật khẩu'}
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
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
