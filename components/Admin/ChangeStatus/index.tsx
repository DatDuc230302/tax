'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import { AdminContext } from '@/app/admin/layout';

export default function ChangeStatus({
    type,
    idUser,
    idPost,
    idBanner,
    status,
    refresh,
    setRefresh,
}: {
    type: string;
    idUser?: string;
    idPost?: string;
    idBanner?: string;
    status: string;
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);
    const dataContext = useContext(AdminContext);
    const handeSubmit = () => {
        switch (type) {
            case 'account':
                return changeStatusAccount();
            case 'post':
                return changeStatusPost();
            case 'banner':
                return changeStatusBanner();
            default:
                return;
        }
    };

    const changeStatusAccount = async () => {
        try {
            const formData: any = new FormData();
            formData.append('id', String(idUser));
            const result = await axios.post(`${serverBackend}/api/v1/userStatus`, formData);
            if (result.data.message === 'success') {
                setRefresh(!refresh);
                setTurn(false);
            }
        } catch {
            console.log('Lỗi');
        }
    };

    const changeStatusPost = async () => {
        try {
            const result = await axios.post(`${serverBackend}/api/v1/postStatus`, {
                user_id: Number(dataContext.id),
                id: idPost,
            });
            if (result.data.message === 'success') {
                setTurn(false);
                setRefresh(!refresh);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const changeStatusBanner = async () => {
        try {
            const formData = new FormData();
            formData.append('id', String(idBanner));
            formData.append('user_id', dataContext.id);
            const resutl = await axios.post(`${serverBackend}/api/v1/bannerStatus`, formData);
            if (resutl.data.message === 'success') {
                setRefresh(!refresh);
                setTurn(false);
            }
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    return (
        <>
            <Tooltip color="primary" content="Thay đổi trạng thái">
                <div onClick={() => setTurn(true)}>
                    <LiaExchangeAltSolid className={'cursor-pointer'} fontSize={20} />
                </div>
            </Tooltip>
            <Modal backdrop="blur" isOpen={turn} onOpenChange={() => setTurn(false)} placement="top-center">
                <ModalContent>
                    <ModalBody className="p-5 w-max">
                        <div className="pt-4 text-[20px]">
                            <span className="flex flex-col gap-1">
                                Xác nhận chuyển trạng thái thành
                                <b>{status === 'active' ? 'Không hoạt động' : 'Hoạt động'}</b>
                            </span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onClick={() => setTurn(false)}>
                            Hủy
                        </Button>
                        <Button onClick={() => handeSubmit()} color="primary">
                            Đồng ý
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
