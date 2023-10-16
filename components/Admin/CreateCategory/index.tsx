'use client';

import React, { useEffect, useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { serverBackend } from '@/server';
import axios from 'axios';

export default function CreateCategory({ refresh, setRefresh }: { refresh: boolean; setRefresh: any }) {
    const [turn, setTurn] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [require, setRequire] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            if (category.length === 0) {
                setRequire(true);
            } else {
                const formData: any = new FormData();
                formData.append('name', String(category));
                const result = await axios.post(`${serverBackend}/api/v1/category`, formData);
                if (result.data.message === 'success') {
                    setTurn(false);
                    setRefresh(!refresh);
                    setCategory('');
                }
            }
        } catch {
            console.log('Lỗi mạnh');
        }
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <Button
                onClick={() => setTurn(true)}
                className="shrink-0 lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] p-0"
                color="primary"
            >
                <AiOutlinePlusCircle fontSize={20} />
                Thêm thể loại
            </Button>
            <Modal hideCloseButton isOpen={turn} className="h-[700px] overflow-y-auto" size="3xl" isDismissable={false}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm thể loại</ModalHeader>
                    <ModalBody>
                        <div className="flex gap-4">
                            <Input
                                label="Nhập thể loại"
                                className="w-full"
                                value={category}
                                onChange={(e) => setCategory(String(e.target.value))}
                                isInvalid={require && category.length === 0}
                                errorMessage={require && category.length === 0 && 'Vui lòng nhập thể loại'}
                                onKeyDown={(e) => handleOnKeyDown(e)}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="light"
                            onClick={() => {
                                setTurn(false);
                                setRequire(false);
                            }}
                        >
                            Đóng
                        </Button>
                        <Button onPress={handleSubmit} color="primary">
                            Thêm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
