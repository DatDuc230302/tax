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
import { isEmail } from '@/functions/isEmail';

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
            const formData: any = new FormData();
            formData.append('image', image, image.name);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('password', pass);
            const result: any = await axios.post(`${serverBackend}/api/v1/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (result.data.status === 'success') {
                alert('Them tai khoan thanh cong');
                console.log(result);
            } else {
            }
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
                                    <div className="flex relative border-[1px] border-[#ccc] w-[120px] h-[120px] rounded-[50%]">
                                        {image && (
                                            <Image
                                                className="rounded-[50%]"
                                                src={showImage ? showImage : ''}
                                                alt=""
                                                sizes="120px"
                                                fill={true}
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
