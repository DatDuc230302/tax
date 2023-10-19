import { AdminContext } from '@/app/admin/layout';
import {
    Badge,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { CiLogout, CiSettings, CiUser } from 'react-icons/ci';
import { BiMessageAltDetail } from 'react-icons/bi';
import LogoutAdmin from '../LogoutAdmin';

export default function CurrentUser() {
    const dataContext = useContext(AdminContext);

    return (
        <div className="flex select-none h-full items-center gap-6">
            <Popover placement="bottom" crossOffset={-60} offset={14}>
                <Badge content="1" size="sm" color="danger">
                    <PopoverTrigger>
                        <div>
                            <BiMessageAltDetail className="cursor-pointer" fontSize={30} color="white" />
                        </div>
                    </PopoverTrigger>
                </Badge>
                <PopoverContent>
                    <div className="px-4 py-2">
                        <div className="text-small font-bold">Hộp thư</div>
                        <div className="">
                            <span>Cập nhật mới</span>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Popover placement="bottom" crossOffset={-60} offset={14}>
                <Badge content="7" size="sm" color="danger">
                    <PopoverTrigger>
                        <div>
                            <BsFillBellFill className="cursor-pointer" fontSize={26} color="white" />
                        </div>
                    </PopoverTrigger>
                </Badge>
                <PopoverContent>
                    <div className="px-4 py-2">
                        <div className="text-small font-bold">Thông báo quan trọng</div>
                        <div className="">
                            <span>Cập nhật mới</span>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Dropdown>
                <DropdownTrigger>
                    <Button className="bg-transparent text-white flex justify-center">
                        <span>{dataContext.name}</span>
                        <MdOutlineKeyboardArrowDown fontSize={20} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Example with disabled actions" disabledKeys={['edit', 'delete']}>
                    <DropdownItem textValue="info">
                        <Link className="flex items-center gap-2" href={'/admin/profile'}>
                            <CiUser fontSize={20} />
                            Xem hồ sơ
                        </Link>
                    </DropdownItem>
                    <DropdownItem textValue="logout">
                        <div className="flex w-full gap-2 items-center">
                            <CiSettings fontSize={20} />
                            Cài đặt
                        </div>
                    </DropdownItem>
                    <DropdownItem textValue="logout">
                        <LogoutAdmin>
                            <div className="flex w-full gap-2 items-center">
                                <CiLogout fontSize={20} />
                                Đăng xuất
                            </div>
                        </LogoutAdmin>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
