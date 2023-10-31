import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from '@nextui-org/react';
import React, { useState } from 'react';
import { MdOutlineRestore } from 'react-icons/md';

export default function RestoreTrash({ type }: { type: string }) {
    const [turn, setTurn] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            <Tooltip content="Khôi phục">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <MdOutlineRestore fontSize={24} />
                </i>
            </Tooltip>
            <Modal hideCloseButton isOpen={turn}>
                <ModalContent>
                    <ModalHeader className="flex gap-1">
                        Khôi phục
                        {type === 'accounts' && <span>tài khoản</span>}
                        {type === 'posts' && <span>bài viết</span>}
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex gap-1">
                            <span>Bạn có muốn khôi phục</span>
                            {type === 'accounts' && <span>tài khoản</span>}
                            {type === 'posts' && <span>bài viết</span>}
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
