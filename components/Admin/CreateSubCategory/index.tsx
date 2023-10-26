'use client';

import React, { useEffect, useState } from 'react';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { serverBackend } from '@/server';
import axios from 'axios';

export default function CreateSubCategory({ refresh, setRefresh }: { refresh: boolean; setRefresh: any }) {
    const [turn, setTurn] = useState<boolean>(false);
    const [subCategory, setSubCategory] = useState<string>('');
    const [showSubCategory, setShowSubCategory] = useState<string>('Chọn thể loại cha');
    const [parentIDCategory, setParentIDCategory] = useState<number>(0);
    const [parentCategories, setParentCategories] = useState<object[]>([]);
    const [require, setRequire] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            if (subCategory.length === 0) {
                setRequire(true);
            } else {
                const formData: any = new FormData();
                formData.append('name', String(subCategory));
                formData.append('parent_id', String(parentIDCategory));
                const result = await axios.post(`${serverBackend}/api/v1/category`, formData);
                if (result.data.message === 'success') {
                    setTurn(false);
                    setRefresh(!refresh);
                    setSubCategory('');
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        getParentCategories();
    }, []);

    const getParentCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/getParentCategory`);
            if (result.data.message === 'success') {
                setParentCategories(result.data.data);
            }
        } catch {}
    };

    return (
        <>
            <Button
                onClick={() => setTurn(true)}
                className="shrink-0 lg:w-max w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] px-3"
                color="primary"
            >
                <AiOutlinePlusCircle fontSize={20} />
                Thêm thể loại con
            </Button>
            <Modal hideCloseButton isOpen={turn} className="h-[200px]" size="3xl" isDismissable={false}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm thể loại con</ModalHeader>
                    <ModalBody>
                        <div className="flex gap-4">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className="w-full h-full" variant="flat">
                                        {showSubCategory}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    {parentCategories.map((item: any, index: number) => (
                                        <DropdownItem
                                            onClick={() => {
                                                setShowSubCategory(item.name);
                                                setParentIDCategory(item.id);
                                            }}
                                            key={index}
                                        >
                                            {item.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                            <Input
                                label="Nhập thể loại con"
                                className="w-full"
                                value={subCategory}
                                onChange={(e) => setSubCategory(String(e.target.value))}
                                isInvalid={require && subCategory.length === 0}
                                errorMessage={require && subCategory.length === 0 && 'Vui lòng nhập thể loại'}
                                onKeyDown={(e) => handleOnKeyDown(e)}
                                disabled={showSubCategory === 'Chọn thể loại cha'}
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
