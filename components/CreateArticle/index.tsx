import React, { useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyUploadAdapter } from './UploadAdapter';

export default function CreateArticle() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [content, setContent] = useState<string>('');

    const handleSubmit = () => {
        if (content.length > 0) {
            alert(content);
        }
    };

    return (
        <>
            <Button
                onClick={() => onOpen()}
                className="shrink-0 h-full w-[180px] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] p-0"
                color="primary"
            >
                <AiOutlinePlusCircle fontSize={20} />
                Thêm bài viết
            </Button>
            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <CKEditor
                                    editor={ClassicEditor}
                                    onReady={(editor: any) => {
                                        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
                                            return new MyUploadAdapter(loader);
                                        };
                                    }}
                                    data=""
                                    onChange={(event, editor: any) => {
                                        setContent(editor.getData());
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => handleSubmit()}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
