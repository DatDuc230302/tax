import { AdminContext } from '@/app/admin/layout';
import { serverBackend } from '@/server';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from '@nextui-org/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';

export default function UpdateCategoryAndSubCategory({
    type,
    idCategory,
    parentIDSubCategory,
    idSubCategory,
    refresh,
    setRefresh,
}: {
    type: string;
    idCategory?: string;
    parentIDSubCategory?: string;
    idSubCategory?: string;
    refresh: boolean;
    setRefresh: any;
}) {
    const dataContext = useContext(AdminContext);
    const [turn, setTurn] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>('');

    const handleSubmit = async () => {
        switch (type) {
            case 'category':
                return updateCategory();
            case 'subCategory':
                return updateSubCategory();
            default:
                return;
        }
    };

    const updateCategory = async () => {
        try {
            if (valueInput.length > 0) {
                const data: any = {
                    name: valueInput,
                    parent_id: String(0),
                    user_id: dataContext.id,
                };
                const result = await axios.put(`${serverBackend}/api/v1/category/${idCategory}`, data);
                if (result.data.message === 'success') {
                    setRefresh(!refresh);
                    setTurn(false);
                    setValueInput('');
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const updateSubCategory = async () => {
        try {
            if (valueInput.length > 0) {
                const data: any = {
                    name: valueInput,
                    parent_id: String(parentIDSubCategory),
                    user_id: dataContext.id,
                };
                const result = await axios.put(`${serverBackend}/api/v1/category/${idSubCategory}`, data);
                if (result.data.message === 'success') {
                    setRefresh(!refresh);
                    setTurn(false);
                    setValueInput('');
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Tooltip
                content={
                    (type === 'category' && 'Đổi tên thể loại cha') ||
                    (type === 'subCategory' && 'Đổi tên thể loại con')
                }
            >
                <i className="cursor-pointer" onClick={() => setTurn(true)}>
                    <BsPencilSquare fontSize={20} />
                </i>
            </Tooltip>
            <Modal isOpen={turn} hideCloseButton>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {type === 'category' && 'Đổi tên thể loại cha'}
                        {type === 'subCategory' && 'Đổi tên thể loại con'}
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            onChange={(e) => setValueInput(String(e.target.value))}
                            label={
                                (type === 'category' && 'Nhập thể loại cha') ||
                                (type === 'subCategory' && 'Nhập thể loại con')
                            }
                            type="text"
                        />
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
