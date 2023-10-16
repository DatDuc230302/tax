'use client';

import React, { useState } from 'react';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
} from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { serverBackend } from '@/server';
import axios from 'axios';

export default function CreateSubCategory({
    categories,
    subCategories,
    refresh,
    setRefresh,
}: {
    categories: any;
    subCategories: any;
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);
    const [category, setCategory] = useState<number>(-1);
    const [subCategory, setSubCategory] = useState<string>('');
    const [require, setRequire] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            if (category === -1) {
                setRequire(true);
            } else {
                const formData: any = new FormData();
                formData.append('category_id', category);
                formData.append('name', subCategory);
                const result: any = await axios.post(`${serverBackend}/api/v1/subcategory`, formData);
                if (result.data.message === 'success') {
                    setRefresh(!refresh);
                    setTurn(false);
                    setCategory(-1);
                    setSubCategory('');
                }
            }
        } catch {
            console.log('Lỗi nè');
        }
    };

    const handleClose = () => {
        setTurn(false);
        setSubCategory('');
        setCategory(-1);
    };

    return (
        <>
            <Button
                onClick={() => setTurn(true)}
                className="shrink-0 lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                color="primary"
            >
                <AiOutlinePlusCircle className="shrink-0" fontSize={20} />
                Thêm thể loại con
            </Button>
            <Modal hideCloseButton className="h-[200px]" size="3xl" isOpen={turn} isDismissable={false}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm thể loại con</ModalHeader>
                    <ModalBody>
                        <div className="flex gap-4">
                            <Select
                                errorMessage={require && category === -1 && 'Vui lòng chọn thể loại'}
                                label="Chọn thể loại bài viết"
                                className="w-full"
                            >
                                {categories.map((item: any, index: number) => (
                                    <SelectItem
                                        key={index}
                                        onClick={() => (category === item.id ? setCategory(-1) : setCategory(item.id))}
                                    >
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input
                                label="Nhập thể loại"
                                className="w-full"
                                isDisabled={category === -1}
                                value={subCategory}
                                onChange={(e) => setSubCategory(String(e.target.value))}
                                isInvalid={require && category === -1}
                                errorMessage={require && category === -1 && 'Vui lòng nhập thể loại'}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={handleClose}>
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
