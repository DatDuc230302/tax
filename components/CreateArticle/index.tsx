import React, { useEffect, useState } from 'react';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

interface items {
    title: string;
}

const listTag: items[] = [{ title: 'Bài báo' }];

const listCategory: items[] = [{ title: 'Kinh dị' }];

export default function CreateArticle() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('Loại bài viết');
    const [tag, setTag] = useState<string>('Tag bài viết');
    const [content, setContent] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');

    const handleSubmit = () => {
        if (content.length > 0) {
            console.log(content);
        }
    };

    const handleCkeditor = (event: any, editor: any) => {
        const data: any = editor.getData();
        setContent(data);
    };

    return (
        <>
            <Button
                onClick={() => onOpen()}
                className="shrink-0 lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] p-0"
                color="primary"
            >
                <AiOutlinePlusCircle fontSize={20} />
                Thêm bài viết
            </Button>
            <Modal
                className="h-[500px] overflow-y-auto"
                size="3xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Thêm bài viết</ModalHeader>
                            <ModalBody>
                                <Input
                                    onChange={(e) => setTitle(String(e.target.value))}
                                    type="text"
                                    value={title}
                                    placeholder="Tên bài viết"
                                />
                                <div className="flex w-full gap-4">
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button className="w-full" variant="flat">
                                                {category}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            {listCategory.map((item: items, index: number) => (
                                                <DropdownItem key={index}>{item.title}</DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button className="w-full" variant="flat">
                                                {tag}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            {listTag.map((item: items, index: number) => (
                                                <DropdownItem key={index}>{item.title}</DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <CKEditor
                                    config={{
                                        ckfinder: {
                                            uploadUrl: 'http://localhost:5000/upload',
                                        },
                                    }}
                                    data={content}
                                    onChange={handleCkeditor}
                                    editor={ClassicEditor}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" onPress={() => handleSubmit()}>
                                    Thêm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
