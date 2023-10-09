import React, { useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
    Chip,
} from '@nextui-org/react';

export default function UpdateUser({
    children,
    nameValue,
    emailValue,
    phoneValue,
    passValue,
    confirmPassValue,
}: {
    children: React.ReactNode;
    nameValue: string;
    emailValue: string;
    phoneValue: string;
    passValue: string;
    confirmPassValue: string;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [name, setName] = useState<string>(nameValue);
    const [email, setEmail] = useState<string>(emailValue);
    const [phone, setPhone] = useState<string>(phoneValue);
    const [pass, setPass] = useState<string>(passValue);

    const [require, setRequire] = useState<boolean>(false);

    const handleSubmit = () => {
        if (name.length === 0 || email.length === 0 || phone.length === 0 || pass.length === 0) {
            setRequire(true);
        } else {
        }
    };

    return (
        <>
            <div className={'w-full justify-center h-full flex items-center gap-2'} onClick={onOpen}>
                {children}
            </div>
            <Modal backdrop="blur" className="z-20" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Cập nhật tài khoản</ModalHeader>
                            <ModalBody>
                                {require && name.length === 0 && <Chip color="danger">Vui lòng nhập tên</Chip>}
                                <Input
                                    autoFocus
                                    label="Tên"
                                    variant="flat"
                                    value={name}
                                    onChange={(e) => setName(String(e.target.value))}
                                />
                                {require && email.length === 0 && <Chip color="danger">Vui lòng nhập email</Chip>}
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(String(e.target.value))}
                                    label="Email"
                                    variant="flat"
                                    type="email"
                                />
                                {require && phone.length === 0 && (
                                    <Chip color="danger">Vui lòng nhập số điện thoại</Chip>
                                )}
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(String(e.target.value))}
                                    label="Số điện thoại"
                                    variant="flat"
                                    type="number"
                                />
                                {require && pass.length === 0 && <Chip color="danger">Vui lòng nhập mật khẩu</Chip>}
                                <Input
                                    value={pass}
                                    onChange={(e) => setPass(String(e.target.value))}
                                    label="Mật khẩu"
                                    type="password"
                                    variant="flat"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={() => onClose()}>
                                    Đóng
                                </Button>
                                <Button onClick={() => handleSubmit()} color="primary">
                                    Cập nhật
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
