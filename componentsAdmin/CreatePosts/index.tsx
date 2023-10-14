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
    Select,
    SelectItem,
} from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { serverImages } from '@/server';
import { BiUpload } from 'react-icons/bi';
import Image from 'next/image';

interface items {
    title: string;
    slug?: string;
}

const listCategory: items[] = [
    { title: 'Tin tức', slug: 'tin-tuc' },
    { title: 'Văn bản', slug: 'van-ban' },
];

const listSubCategory: items[] = [
    { title: 'Giải trí', slug: 'giai-tri' },
    { title: 'Thể thao', slug: 'the-thao' },
    { title: 'Hài hước', slug: 'hai-huoc' },
    { title: 'Tuổi trẻ', slug: 'tuoi-tre' },
];

export default function CreatePosts() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [image, setImage] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [subCategory, setSubCategory] = useState<string>('');
    const [content, setContent] = useState<string>('Nội dung bài viết');
    const [require, setRequire] = useState<boolean>(false);

    const handleSubmit = () => {
        if (
            title.length === 0 ||
            category.length === 0 ||
            subCategory.length === 0 ||
            content.length === 0 ||
            image === null
        ) {
            setRequire(true);
        } else {
            const data: object = {
                User_id: '1',
                Images: '2',
                Title: title,
                Category: category,
                SubCategory: subCategory,
                Content: content,
            };
        }
    };

    const handleCkeditor = (event: any, editor: any) => {
        const data: any = editor.getData();
        setContent(data);
    };

    const handleUploadImg = (e: any) => {
        const file = e.target.files[0];
        const reader: any = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
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
                className="h-[700px] overflow-y-auto"
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
                                    label="Tiêu đề bài viết"
                                    errorMessage={require && title.length === 0 && 'Vui lòng nhập tiêu đề bài viết'}
                                />
                                <div className="flex gap-4">
                                    <Select
                                        errorMessage={require && category.length === 0 && 'Vui lòng chọn thể loại'}
                                        label="Chọn thể loại bài viết"
                                        className="w-full"
                                    >
                                        {listCategory.map((item: items, index: number) => (
                                            <SelectItem onClick={() => setCategory(String(item.slug))} key={index}>
                                                {item.title}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        isDisabled={category.length > 0 ? false : true}
                                        label="Chọn thể loại con"
                                        className="w-full"
                                        errorMessage={
                                            require &&
                                            category.length > 0 &&
                                            subCategory.length === 0 &&
                                            'Vui lòng chọn thể loại con'
                                        }
                                    >
                                        {listSubCategory.map((item: items, index: number) => (
                                            <SelectItem onClick={(e) => setSubCategory(String(item.slug))} key={index}>
                                                {item.title}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button color="default" className="w-[250px] p-0">
                                        <label
                                            className="w-full h-full flex items-center cursor-pointer justify-center"
                                            htmlFor="uploadImg"
                                        >
                                            <BiUpload color={'black'} fontSize={20} />
                                            Tải hình đại diện
                                        </label>
                                    </Button>
                                    <div className="flex border-[1px] relative border-[#ccc] w-full h-[300px]">
                                        {image && <Image src={image} alt="" sizes="300px" fill={true} />}
                                    </div>
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

                                <input onChange={(e) => handleUploadImg(e)} id="uploadImg" type="file" hidden />
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
