'use client';

import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { BsFillTrashFill, BsPlusCircle } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';

export default function BannersAdmin() {
    return (
        <div className="flex w-full px-4 mt-4 justify-center">
            <div className="flex w-full flex-col gap-3">
                <div className="flex justify-end">
                    <Button color="primary" className="gap-2 w-[170px]">
                        <i className="shrink-0">
                            <BsPlusCircle fontSize={20} />
                        </i>
                        Thêm Banner
                    </Button>
                </div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>BANNER</TableColumn>
                        <TableColumn>TOOLS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>
                                <div className="w-[100px] h-[100px] relative">
                                    <Image src={'/imgs/avatar.jpg'} alt="" fill sizes="100000px" />
                                </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap ">
                                <div className="flex gap-2">
                                    <i>
                                        <BsFillTrashFill fontSize={20} />
                                    </i>
                                    <i>
                                        <MdRestore fontSize={20} />
                                    </i>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
