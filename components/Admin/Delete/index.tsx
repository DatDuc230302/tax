'use client';

import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import { BsFillTrashFill } from 'react-icons/bs';

export default function Delete({
    type,
    idUser,
    idPost,
    idBanner,
    refresh,
    setRefresh,
}: {
    type: string;
    idUser?: string;
    idPost?: string;
    idBanner?: string;
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);

    const handeSubmit = () => {
        switch (type) {
            case 'account':
                return deleteAccount();
            case 'post':
                return deletePost();
            case 'banner':
                return deleteBanner();
            default:
                return;
        }
    };

    const deletePost = async () => {
        const result = await axios.delete(`${serverBackend}/api/v1/post/${idPost}`);
        if (result.data.message === 'success') {
            setRefresh(!refresh);
            setTurn(false);
        }
    };

    const deleteAccount = async () => {
        try {
            const result = await axios.delete(`${serverBackend}/api/v1/user/${idUser}`);
            if (result.data.message === 'success') {
                setRefresh(!refresh);
                setTurn(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteBanner = async () => {
        try {
            const resutl = await axios.delete(`${serverBackend}/api/v1/bannerImages/${idBanner}`);
            if (resutl.data.message === 'success') {
                setRefresh(!refresh);
                setTurn(false);
            }
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    return (
        <>
            <Tooltip
                color="primary"
                content={
                    (type === 'account' && 'Xóa tài khoản') ||
                    (type === 'post' && 'Xóa bài đăng') ||
                    (type === 'banner' && 'Xóa banner')
                }
            >
                <div className="cursor-pointer" onClick={() => setTurn(true)} color="primary">
                    <BsFillTrashFill fontSize={20} />
                </div>
            </Tooltip>
            <Modal backdrop="blur" isOpen={turn} onOpenChange={() => setTurn(false)} placement="top-center">
                <ModalContent>
                    <ModalBody className="p-5">
                        <div className="pt-4 text-[20px]">
                            {type === 'post' && (
                                <span className="flex gap-1">Bạn có muốn xóa bài đăng này không ?</span>
                            )}
                            {type === 'account' && (
                                <span className="flex gap-1">Bạn có muốn xóa tài khoản này không ?</span>
                            )}
                            {type === 'banner' && (
                                <span className="flex gap-1">Bạn có muốn xóa Banner này không ?</span>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onClick={() => setTurn(false)}>
                            Hủy
                        </Button>
                        <Button onPress={handeSubmit} color="primary">
                            Đồng ý
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
