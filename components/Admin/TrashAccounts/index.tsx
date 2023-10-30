'use client';

import { formatTime } from '@/functions/formatTime';
import {
    Button,
    Input,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tabs,
    Tooltip,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';

export default function TrashAccounts() {
    const [turn, setTurn] = useState<boolean>(false);

    return (
        <>
            <Button
                onClick={() => setTurn(true)}
                className="h-[40px] text-white lg:w-[180px] w-[100%] xs:w-[48%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                color="primary"
            >
                <BsTrashFill fontSize={20} />
                Thùng rác
            </Button>
            {turn && (
                <div className="fixed z-30 top-[70px] bg-white bottom-0 left-0 right-0">
                    <div className="flex flex-col px-5 mt-4 w-full">
                        <div className="flex flex-col w-full gap-4 mt-4">
                            <div className="flex w-full justify-between px-3">
                                <h2 className="text-[26px] font-bold">Tài khoản đã xóa</h2>
                                <Tooltip content="Đóng">
                                    <i onClick={() => setTurn(false)}>
                                        <AiOutlineClose className="cursor-pointer" fontSize={20} />
                                    </i>
                                </Tooltip>
                            </div>
                            <Table
                                aria-label="Example table with client side pagination"
                                classNames={{
                                    wrapper: 'max-h-[400px]',
                                }}
                            >
                                <TableHeader>
                                    <TableColumn key="ID">ID</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key={'text'}>
                                        <TableCell className="whitespace-nowrap">{'Dat'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
