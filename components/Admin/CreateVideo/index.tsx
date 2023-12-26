'use client';

import React, { useContext, useEffect, useState } from 'react';
import { parse } from 'url';
import { parse as qsParse } from 'querystring';

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
    SelectItem,
} from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AdminContext } from '@/app/admin/layout';
import axios from 'axios';
import { serverBackend } from '@/server';
import { videoImg } from '@/public/imgs/video';

export default function CreateVideo({
    categories,
    parentCategories,
    refresh,
    setRefresh,
}: {
    categories: object[];
    parentCategories: object[];
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);
    const [linkVideo, setLinkVideo] = useState<string>('');
    const [shortDesc, setShortDesc] = useState<string>('');
    const [categoryID, setCategoryID] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');

    const dataContext: any = useContext(AdminContext);

    const handleSubmit = async () => {
        const parsedUrl: any = parse(linkVideo);
        const videoId: any = qsParse(parsedUrl.query).v;
        try {
            const formData: any = new FormData();
            formData.append('user_id', dataContext.id);
            formData.append('title', 'Video');
            formData.append('short_desc', shortDesc);
            formData.append('content', videoId);
            formData.append('image', videoImg);
            formData.append('serial_number', 'Video');
            formData.append('Issuance_date', 'Video');
            formData.append('category_id', categoryID);
            formData.append('file', []);
            const result = await axios.post(`${serverBackend}/api/v1/post`, formData);
            if (result.data.message === 'success') {
                setTurn(false);
                setRefresh(!refresh);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            <Button
                onClick={() => setTurn(true)}
                className="shrink-0 lg:w-[180px] w-[100%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] p-0"
                color="primary"
            >
                <AiOutlinePlusCircle fontSize={20} />
                Thêm video
            </Button>
            <Modal size="xl" isOpen={turn} onOpenChange={() => setTurn(false)} isDismissable={false}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm video</ModalHeader>
                    <ModalBody>
                        <Input
                            onChange={(e) => setLinkVideo(String(e.target.value))}
                            label={'Link video youtube'}
                            type="text"
                            variant="flat"
                        />
                        <Input
                            onChange={(e) => setShortDesc(String(e.target.value))}
                            label={'Mô tả video'}
                            type="text"
                            variant="flat"
                        />
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className="w-full h-full px-0" variant="flat">
                                    <Input label="Thể loại video" type="text" value={categoryName} />
                                    <i className="absolute cursor-pointer left-0 right-0 bottom-0 top-0"></i>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                {categories
                                    .filter((categoryName: any) => categoryName.parent_name === 'Video')
                                    .map((item: any, index: number) => (
                                        <SelectItem
                                            onClick={() => {
                                                setCategoryID(item.id);
                                                setCategoryName(item.name);
                                            }}
                                            key={index}
                                        >
                                            {item.name}
                                        </SelectItem>
                                    ))}
                            </DropdownMenu>
                        </Dropdown>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => setTurn(false)}>
                            Đóng
                        </Button>
                        <Button color="primary" onPress={() => handleSubmit()}>
                            Thêm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
