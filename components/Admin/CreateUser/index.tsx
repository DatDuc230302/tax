'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import { BsPencilSquare } from 'react-icons/bs';
import Image from 'next/image';
import { isEmail } from '@/functions/isEmail';
import AlertDialog from '../../Common/AlertMessage';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function CreateUser() {
    const [turn, setTurn] = useState<boolean>(false);

    const [showImage, setShowImage] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [require, setRequire] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
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
                const result: any = await axios.post(`${serverBackend}/api/v1/register`, formData);
                if (result.data.status === 'success') {
                } else {
                }
            }
        } catch (err: any) {
            if (err.response.status === 500) {
                setAlert(true);
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
            <Button
                className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                onClick={() => setTurn(true)}
            >
                <AiOutlinePlusCircle fontSize={20} />
                Thêm tài khoản
            </Button>

            {alert && <AlertDialog title="Thông báo" content="Email này đã có người sử dụng vui lòng tạo email khác" />}
            <Modal
                backdrop="blur"
                className="z-20 h-[700px] overflow-y-auto"
                isOpen={turn}
                onOpenChange={() => setTurn(false)}
                placement="top-center"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Tạo tài khoản</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex relative border-[1px] w-[120px] border-[#ccc] h-[120px] rounded-[50%]">
                                {image && (
                                    <Image
                                        className="rounded-[50%]"
                                        src={showImage ? showImage : ''}
                                        alt=""
                                        sizes="100000px"
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
