import SnackbarTimeout from '@/components/Common/SnackbarTimeout';
import { serverBackend } from '@/server';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

export default function DeletePermanent({
    type,
    idTrashUser,
    idTrashPost,
    refresh,
    setRefresh,
}: {
    type: string;
    idTrashUser?: string;
    idTrashPost?: string;
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = () => {
        switch (type) {
            case 'account':
                return deletePermanentAccount();
            case 'post':
                return deletePermanentPost();
            default:
                return;
        }
    };

    const deletePermanentAccount = async () => {
        try {
            const result = await axios.delete(`${serverBackend}/api/v1/trashed/${idTrashUser}`);
            if (result.data.message === 'success') {
                setTurn(false);
                setRefresh(!refresh);
                setSuccess(true);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    const deletePermanentPost = async () => {
        try {
            const result = await axios.delete(`${serverBackend}/api/v1/posts/trashed/${idTrashPost}`);
            if (result.data.message === 'success') {
                setTurn(false);
                setRefresh(!refresh);
                setSuccess(true);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            {type === 'account' && (
                <SnackbarTimeout title="Tài khoản đã bị xóa vĩnh viễn" turn={success} setTurn={setSuccess} />
            )}
            {type === 'post' && (
                <SnackbarTimeout title="Bài viết đã bị xóa vĩnh viễn" turn={success} setTurn={setSuccess} />
            )}
            <SnackbarTimeout title="Tài khoản đã bị xóa vĩnh viễn" turn={success} setTurn={setSuccess} />
            <Tooltip content="Xóa vĩnh viễn">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <BsFillTrashFill fontSize={24} />
                </i>
            </Tooltip>
            <Modal hideCloseButton isOpen={turn}>
                <ModalContent>
                    <ModalHeader className="flex gap-1">
                        Xóa vĩnh viễn
                        {type === 'account' && <span>tài khoản</span>}
                        {type === 'post' && <span>bài viết</span>}
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex gap-1">
                            <span>Bạn có muốn xóa vĩnh viễn</span>
                            {type === 'account' && <span>tài khoản</span>}
                            {type === 'post' && <span>bài viết</span>}
                            này không ?
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setTurn(false)} color="danger" variant="light">
                            Đóng
                        </Button>
                        <Button onClick={() => handleSubmit()} color="primary">
                            Đồng ý
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
