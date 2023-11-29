'use client';

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { loadingApi } from '@/functions/loadingApi';
import { serverBackend } from '@/server';
import { encrypt } from '@/functions/crypto';
import AlertDialog from '../../Common/AlertDialog';
import { isEmail } from '@/functions/isEmail';
import SnackbarMessage from '@/components/Common/SnackbarMessage';

export default function LoginAdmin() {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [hidePass, setHidePass] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [require, setRequire] = useState<boolean>(false);
    const [wrongAccount, setWrongAccount] = useState<boolean>(false);
    const [inactive, setInactive] = useState<boolean>(false);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = loadingApi(async () => {
        try {
            if (email.length === 0 || !isEmail(email) || pass.length === 0) {
                setRequire(true);
            } else {
                let res: any = await fetch(`${serverBackend}/api/v1/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: pass,
                    }),
                });
                res = await res.json();
                if (res.status === 'success') {
                    if (res.user.status === 'active') {
                        const currentUser: object = {
                            id: res.user.id,
                            name: res.user.name,
                            role: res.user.role,
                            email: res.user.email,
                            phone: res.user.phone,
                            token: res.authorization.token,
                            pass: res.pass,
                        };
                        const valueEncrypt: any = encrypt(JSON.stringify(currentUser), 'DucDat2303');
                        sessionStorage.setItem('currentUser', valueEncrypt);
                        router.push('/admin');
                        setLoginSuccess(true);
                    } else {
                        setInactive(true);
                    }
                } else if (res.message === 'Unauthorized') {
                    setWrongAccount(true);
                }
            }
        } catch (err: any) {
            console.log(err);
        }
    }, setLoading);

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && handleSubmit();
    };

    return (
        <div>
            <AlertDialog
                turn={wrongAccount}
                setTurn={setWrongAccount}
                title="Thông báo"
                content="Tài khoản hoặc mật khẩu không đúng"
            />
            <AlertDialog
                turn={inactive}
                setTurn={setInactive}
                title="Thông báo"
                content="Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên"
            />
            {loginSuccess && <SnackbarMessage title="Đăng nhập thành công" type={1} />}
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
