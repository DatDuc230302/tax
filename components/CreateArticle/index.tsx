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
    Select,
    SelectItem,
} from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { serverImages } from '@/server';

interface items {
    title: string;
    slug?: string;
}

const listTag: items[] = [
    { title: 'Giải trí', slug: 'giai-tri' },
    { title: 'Thể thao', slug: 'the-thao' },
    { title: 'Hài hước', slug: 'hai-huoc' },
    { title: 'Tuổi trẻ', slug: 'tuoi-tre' },
];

const listCategory: items[] = [
    { title: 'Giải trí', slug: 'giai-tri' },
    { title: 'Thể thao', slug: 'the-thao' },
    { title: 'Hài hước', slug: 'hai-huoc' },
    { title: 'Tuổi trẻ', slug: 'tuoi-tre' },
];

export default function CreateArticle() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [content, setContent] = useState<string>('');

    const handleChooseTag = (slugTag: string) => {
        if (tags.includes(slugTag)) {
            setTags(tags.filter((item: string) => item !== slugTag));
        } else {
            setTags([...tags, slugTag]);
        }
    };

    const handleSubmit = () => {
        if (title.length === 0 || category.length === 0 || tags.length === 0 || content.length === 0) {
            alert('Du lieu con thieu khong the post');
        } else {
            alert('Ok');
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
                className="h-[650px] overflow-y-auto"
                size="3xl"
                isOpen={true}
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
                                    label="Tên bài viết"
                                />
                                <div className="flex gap-4">
                                    <Select label="Chọn thể loại bài viết" className="w-full">
                                        {listCategory.map((item: items, index: number) => (
                                            <SelectItem onClick={() => setCategory(String(item.slug))} key={index}>
                                                {item.title}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select selectionMode="multiple" label="Chọn tag bài viết" className="w-full">
                                        {listTag.map((item: items, index: number) => (
                                            <SelectItem onClick={() => handleChooseTag(String(item.slug))} key={index}>
                                                {item.title}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <CKEditor
                                    config={{
                                        ckfinder: {
                                            uploadUrl: `${serverImages}/upload`,
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
