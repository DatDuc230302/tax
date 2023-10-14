import { AdminContext } from '@/app/admin/layout';
import {
    Badge,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { CiLogout, CiSettings, CiUser } from 'react-icons/ci';
import axios from 'axios';
import { serverBackend } from '@/server';
import { BiMessageAltDetail } from 'react-icons/bi';

export default function CurrentUser() {
    const dataContext = useContext(AdminContext);

    const router = useRouter();

    const logout = async () => {
        try {
            const token: any = sessionStorage.getItem('access_token');
            const result = await axios.post(
                `${serverBackend}/api/v1/logout`,
                {},
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (result.data.status === 'success') {
                sessionStorage.removeItem('currentUser');
                router.push('/login');
            }
        } catch {
            console.log('Error');
        }
    };

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
                    <div className="cursor-pointer gap-2 pr-2 flex h-full items-center">
                        <div style={{ height: 40, width: 40 }} className="relative">
                            <Image src="/imgs/avatar.jpg" fill sizes="40px" className="rounded-[50%]" alt="" />
                        </div>
                        <div className="flex items-center text-[14px] text-white">
                            <span>{dataContext.name}</span>
                            <MdOutlineKeyboardArrowDown fontSize={20} />
                        </div>
                    </div>
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
                    <DropdownItem onClick={() => logout()} textValue="logout">
                        <div className="flex w-full gap-2 items-center">
                            <CiLogout fontSize={20} />
                            Đăng xuất
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
