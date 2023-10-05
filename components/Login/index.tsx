import React, { useState } from 'react';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from '@nextui-org/react';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function Login({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [phone, setPhone] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const [hidePass, setHidePass] = useState<boolean>(true);

    const handleSubmit = () => {};
    return (
        <>
            <div className="flex items-center gap-2" onClick={onOpen}>
                {children}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Đăng nhập</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    variant="bordered"
                                    type="number"
                                    onChange={(e) => e.target.value[0] !== ' ' && setPhone(e.target.value)}
                                    value={phone}
                                />
                                <div className="relative">
                                    <Input
                                        label="Mật khẩu"
                                        placeholder="Nhập mật khẩu"
                                        type={hidePass ? 'password' : 'text'}
                                        variant="bordered"
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
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Hủy
                                </Button>
                                <Button onClick={() => handleSubmit()} color="primary">
                                    Đăng nhập
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
