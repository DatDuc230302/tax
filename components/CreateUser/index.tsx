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
    Chip,
    Tooltip,
} from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import { BsPencilSquare } from 'react-icons/bs';
import Image from 'next/image';

export default function CreateUser({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [showImage, setShowImage] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');

    const [require, setRequire] = useState<boolean>(false);

    const handleSubmit = async () => {
        const token: any = localStorage.getItem('access_token');
        if (
            name.length === 0 ||
            email.length === 0 ||
            phone.length === 0 ||
            pass.length === 0 ||
            confirmPass.length === 0 ||
            image === null
        ) {
            setRequire(true);
        } else {
            const result: any = await axios.post(
                `${serverBackend}/api/v1/user`,
                {
                    image: image,
                    name: name,
                    email: email,
                    phone: phone,
                    pass: pass,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        }
    };

    const handleUploadImg = (e: any) => {
        const file = e.target.files[0];
        const reader: any = new FileReader();

        reader.onloadend = () => {
            setShowImage(reader.result);
            setImage(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setShowImage(null);
        }
    };

    return (
        <>
            <div className={'w-full justify-center h-full flex items-center gap-2'} onClick={onOpen}>
                {children}
            </div>
            <Modal
                backdrop="blur"
                className="z-20 h-[700px] overflow-y-auto"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Tạo tài khoản</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="flex border-[1px] border-[#ccc] w-[120px] h-[120px] rounded-[50%]">
                                        {image && (
                                            <Image
                                                className="rounded-[50%]"
                                                src={showImage}
                                                alt=""
                                                width={0}
                                                height={0}
                                                layout="responsive"
                                            />
                                        )}
                                    </div>
                                    <Tooltip color="secondary" content="Thêm ảnh đại diện">
                                        <label htmlFor="uploadImage" className=" cursor-pointer">
                                            <BsPencilSquare fontSize={20} />
                                        </label>
                                    </Tooltip>
                                    <input id="uploadImage" hidden type="file" onChange={(e) => handleUploadImg(e)} />
                                </div>
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
                                {require && confirmPass.length === 0 && (
                                    <Chip color="danger">Vui lòng nhập lại mật khẩu</Chip>
                                )}
                                {pass !== confirmPass && <Chip color="danger">Mật khẩu không trùng khớp</Chip>}
                                <Input
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(String(e.target.value))}
                                    label="Nhập lại Mật khẩu"
                                    type="password"
                                    variant="flat"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={() => onClose()}>
                                    Đóng
                                </Button>
                                <Button onClick={() => handleSubmit()} color="primary">
                                    Tạo
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
