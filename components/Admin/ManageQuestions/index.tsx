import { serverBackend } from '@/server';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Tooltip,
} from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiMiniPencilSquare } from 'react-icons/hi2';

export default function ManageQuestions() {
    const [postParent, setPostParent] = useState<boolean>(false);
    const [childrends, setChildrends] = useState<any>({});
    const [isChildrend, setIsChildrend] = useState<number>(-1);
    const [textChild, setTextChild] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [selectedOption, setSeletedOption] = useState<string>('');
    const [answers, setAnswers] = useState<any>({});
    const [turn, setTurn] = useState<boolean>(false);

    const getParentAnswers = async () => {
        try {
            const result = await axios.post(`${serverBackend}/api/v1/get-answer`);
            setAnswers(result.data.answer);
            console.log(result.data.answer);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };

    useEffect(() => {
        getParentAnswers();
    }, []);

    const handlePostParent = async () => {
        const formData = new FormData();
        formData.append('newOption', question);
        if (selectedOption.length > 0) {
            formData.append('seletedOption', selectedOption);
        }
        try {
            const result = await axios.post(`${serverBackend}/api/v1/add-answer`, formData);
            if (result.data.message === 'Thêm câu hỏi và câu trả lời thành công') {
                setPostParent(false);
                getParentAnswers();
            }
        } catch (error) {
            console.error('Error adding answer:', error);
        }
    };

    const checkParent = async (valueSelected: string) => {
        const formData = new FormData();
        formData.append('selectedOption', valueSelected);
        try {
            const result = await axios.post(`${serverBackend}/api/v1/get-answer`, formData);
            if (result.data.answer === 'Xin lỗi, không có câu trả lời cho lựa chọn này.') {
                setIsChildrend(1);
            } else {
                setIsChildrend(2);
                setChildrends(result.data.answer);
            }
        } catch {}
    };

    // const deleteAnswers = async () => {
    //     const formData = new FormData();
    //     formData.append('selectedOption', selectedOption || '');
    //     formData.append('deletedOption', selectedOption || '');
    //     try {
    //         const result = await axios.post(`${serverBackend}/api/v1/delete-answer`, formData);
    //         getParentAnswers();
    //     } catch (error) {
    //         console.error('Error deleting answers:', error);
    //     }
    // };

    return (
        <>
            <Button onClick={() => setTurn(true)}>Quản lý câu hỏi</Button>
            <Modal
                className="h-[600px] flex overflow-y-auto"
                size="2xl"
                isOpen={turn}
                onOpenChange={() => setTurn(false)}
                isDismissable={false}
            >
                <ModalContent className="w-wMain">
                    <ModalHeader className="flex flex-col gap-1">Quản lý câu hỏi</ModalHeader>
                    <ModalBody>
                        <div className="flex justify-center bg-white p-4 z-20000000">
                            <div className="w-[600px] flex flex-col">
                                <div className="flex py-4 gap-4 w-full items-center">
                                    <Select
                                        label="Bảng câu hỏi"
                                        className="max-w-xs"
                                        onChange={(e) => setSeletedOption(String(e.target.value))}
                                        variant="bordered"
                                    >
                                        {Object.keys(answers).map((option) => (
                                            <SelectItem onClick={() => checkParent(option)} key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Button
                                        onClick={() => setPostParent(true)}
                                        className="px-8 font-bold text-[18px] h-full"
                                        color="primary"
                                    >
                                        +
                                    </Button>
                                </div>
                                {postParent && (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            className="w-[320px]"
                                            onChange={(e: any) => setQuestion(String(e.target.value))}
                                            variant="bordered"
                                            label="Nhập câu hỏi"
                                        />
                                        <Button onClick={() => handlePostParent()} className="px-8" color="primary">
                                            Thêm
                                        </Button>
                                        <Button onClick={() => setPostParent(false)} className="px-8" color="primary">
                                            Hủy
                                        </Button>
                                    </div>
                                )}
                                {isChildrend === 2 && (
                                    <Select
                                        label="Bảng câu hỏi"
                                        className="max-w-xs"
                                        onChange={(e) => setSeletedOption(String(e.target.value))}
                                        variant="bordered"
                                    >
                                        {Object.keys(childrends).map((option) => (
                                            <SelectItem onClick={() => checkParent(option)} key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )}
                                {isChildrend === 1 && (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            className="w-[320px]"
                                            onChange={(e: any) => setQuestion(String(e.target.value))}
                                            variant="bordered"
                                            label="Nhập câu hỏi"
                                        />
                                        <Button onClick={() => handlePostParent()} className="px-8" color="primary">
                                            Thêm
                                        </Button>
                                        <Button onClick={() => setPostParent(false)} className="px-8" color="primary">
                                            Hủy
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={() => setTurn(false)}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
