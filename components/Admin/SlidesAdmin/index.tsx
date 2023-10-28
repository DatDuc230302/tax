'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';

export default function BannersAdmin() {
    return (
        <div className="flex w-full px-4 mt-4 justify-center">
            <div className="flex w-full ">
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>BANNER</TableColumn>
                        <TableColumn>TOOLS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Tony Reichert</TableCell>
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
