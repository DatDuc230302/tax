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
    Tooltip,
} from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { serverImages } from '@/server';
import { BiUpload } from 'react-icons/bi';
import Image from 'next/image';
import { HiMiniPencilSquare } from 'react-icons/hi2';

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

export default function UpdatePost({
    oldTitle,
    oldContent,
    oldCategory,
    oldSubCategory,
}: {
    oldTitle: string;
    oldContent: string;
    oldCategory: string;
    oldSubCategory: string;
}) {
    const [turn, setTurn] = useState<boolean>(false);

    const [image, setImage] = useState<any>(null);
    const [title, setTitle] = useState<string>(oldTitle);
    const [category, setCategory] = useState<string>(oldCategory);
    const [subCategory, setSubCategory] = useState<string>(oldSubCategory);
    const [content, setContent] = useState<string>(oldContent);
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
            <Tooltip color="primary" content="Cập nhật bài viết">
                <i onClick={() => setTurn(true)} className="cursor-pointer">
                    <HiMiniPencilSquare fontSize={20} />
                </i>
            </Tooltip>
            <Modal
                style={{ height: 700, overflow: 'auto' }}
                size="3xl"
                isOpen={turn}
                onOpenChange={() => setTurn(false)}
                isDismissable={false}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Cập nhật bài viết</ModalHeader>
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
                                    <SelectItem
                                        onClick={() =>
                                            category === item.slug ? setCategory('') : setCategory(String(item.slug))
                                        }
                                        key={index}
                                    >
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
                            <Button color="default" className="w-[250px] p-4">
                                <label
                                    className="w-full h-full flex items-center cursor-pointer justify-center"
                                    htmlFor="uploadImg"
                                >
                                    <BiUpload color={'black'} fontSize={20} />
                                    Tải hình đại diện
                                </label>
                            </Button>
                            <div style={{ height: 300 }} className="flex border-[1px] relative border-[#ccc] w-full">
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
