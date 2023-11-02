import SnackbarTimeout from '@/components/Common/SnackbarTimeout';
import { serverBackend } from '@/server';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import React, { useState } from 'react';
import { MdOutlineRestore } from 'react-icons/md';

export default function RestoreTrash({
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
    const [restoreSuccess, setRestoreSuccess] = useState<boolean>(false);

    const handleSubmit = () => {
        switch (type) {
            case 'account':
                return restoreAccount();
            case 'post':
                return restorePost();
            default:
                return;
        }
    };

    const restoreAccount = async () => {
        try {
            const result = await axios.put(`${serverBackend}/api/v1/restore/${idTrashUser}`);
            if (result.data.message === 'success') {
                setTurn(false);
                setRefresh(!refresh);
                setRestoreSuccess(true);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    const restorePost = async () => {
        try {
            const result = await axios.put(`${serverBackend}/api/v1/restore-posts/${idTrashPost}`);
            if (result.data.message === 'success') {
                setTurn(false);
                setRefresh(!refresh);
                setRestoreSuccess(true);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            <SnackbarTimeout title="Khôi phục thành công" turn={restoreSuccess} setTurn={setRestoreSuccess} />
            <Tooltip content="Khôi phục">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <MdOutlineRestore fontSize={24} />
                </i>
            </Tooltip>
            <Modal hideCloseButton isOpen={turn}>
                <ModalContent>
                    <ModalHeader className="flex gap-1">
                        Khôi phục
                        {type === 'account' && <span>tài khoản</span>}
                        {type === 'post' && <span>bài viết</span>}
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex gap-1">
                            <span>Bạn có muốn khôi phục</span>
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
