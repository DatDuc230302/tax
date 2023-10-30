import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import CreateUser from '../CreateUser';
import TrashAccounts from '../TrashAccounts';

export default function AccountsToolsAdmin({
    setUsers,
    initialUsers,
    refresh,
    setRefresh,
}: {
    setUsers: any;
    initialUsers: object[];
    refresh: boolean;
    setRefresh: any;
}) {
    const [sortUsers, setSortUsers] = useState<object[]>([]);
    const [selection, setSelection] = useState<string>('Tên');
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');
    const [sortRole, setSortRole] = useState<string>('Sắp xếp quyền');

    useEffect(() => {
        const key: string = searchValue;
        switch (selection) {
            case 'Tên':
                setUsers(
                    sortUsers.filter((item: any) => item.name.toLocaleLowerCase().includes(key.toLocaleLowerCase())),
                );
                break;
            case 'Email':
                setUsers(
                    sortUsers.filter((item: any) => item.email.toLocaleLowerCase().includes(key.toLocaleLowerCase())),
                );
                break;
            case 'Số điện thoại':
                setUsers(
                    sortUsers.filter((item: any) => item.phone.toLocaleLowerCase().includes(key.toLocaleLowerCase())),
                );
                break;
            default:
                return;
        }
    }, [searchValue, selection]);

    useEffect(() => {
        let sortData: object[] = [];
        if (sortStatus === 'Sắp xếp trạng thái') {
            if (sortRole === 'Sắp xếp quyền') {
                sortData = initialUsers;
            } else if (sortRole === 'Quản trị viên') {
                sortData = initialUsers.filter((item: any) => item.role === 'root');
            } else if (sortRole === 'Người quản lý') {
                sortData = initialUsers.filter((item: any) => item.role === 'admin');
            }
        } else if (sortStatus === 'Hoạt động') {
            if (sortRole === 'Sắp xếp quyền') {
                sortData = initialUsers.filter((item: any) => item.status === 'active');
            } else if (sortRole === 'Quản trị viên') {
                sortData = initialUsers.filter((item: any) => item.status === 'active' && item.role === 'root');
            } else if (sortRole === 'Người quản lý') {
                sortData = initialUsers.filter((item: any) => item.status === 'active' && item.role === 'admin');
            }
        } else if (sortStatus === 'Không hoạt động') {
            if (sortRole === 'Sắp xếp quyền') {
                sortData = initialUsers.filter((item: any) => item.status === 'inactive');
            } else if (sortRole === 'Quản trị viên') {
                sortData = initialUsers.filter((item: any) => item.status === 'inactive' && item.role === 'root');
            } else if (sortRole === 'Người quản lý') {
                sortData = initialUsers.filter((item: any) => item.status === 'inactive' && item.role === 'admin');
            }
        }
        setUsers(sortData);
        setSortUsers(sortData);
        setSearchValue('');
    }, [sortStatus, sortRole, initialUsers]);

    return (
        <div className="flex flex-col h-max gap-3 py-4">
            <div className="flex w-full flex-col lg:flex-row gap-3">
                <div className="flex flex-col xs:flex-row lg:justify-start justify-between gap-3">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="shrink-0 h-[40px] text-white lg:w-[180px] w-[100%] xs:w-[48%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                variant="flat"
                            >
                                {sortStatus}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Single selection example" variant="flat">
                            <DropdownItem onClick={() => setSortStatus('Sắp xếp trạng thái')} key="text">
                                Tất cả
                            </DropdownItem>
                            <DropdownItem onClick={() => setSortStatus('Hoạt động')} key="text">
                                Hoạt động
                            </DropdownItem>
                            <DropdownItem onClick={() => setSortStatus('Không hoạt động')} key="text">
                                Không hoạt động
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="shrink-0 h-[40px] text-white lg:w-[180px] w-[100%] xs:w-[48%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                variant="flat"
                            >
                                {sortRole}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Single selection example" variant="flat">
                            <DropdownItem onClick={() => setSortRole('Sắp xếp quyền')} key="text">
                                Tất cả
                            </DropdownItem>
                            <DropdownItem onClick={() => setSortRole('Quản trị viên')} key="text">
                                Quản trị viên
                            </DropdownItem>
                            <DropdownItem onClick={() => setSortRole('Người quản lý')} key="text">
                                Người quản lý
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex flex-col xs:flex-row lg:justify-start justify-between gap-[6px]">
                    <CreateUser refresh={refresh} setRefresh={setRefresh} />
                    <TrashAccounts />
                </div>
            </div>
            <div className="flex items-center h-full flex-1 relative ">
                <Input
                    onChange={(e) => setSearchValue(String(e.target.value))}
                    className="rounded-none"
                    type="text"
                    placeholder={`Tìm kiếm theo ${selection}`}
                    value={searchValue}
                />
                <div className="absolute right-0">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="flat">{selection}</Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                        >
                            <DropdownItem onClick={() => setSelection('Tên')} key="text">
                                Tên
                            </DropdownItem>
                            <DropdownItem onClick={() => setSelection('Email')} key="text">
                                Email
                            </DropdownItem>
                            <DropdownItem onClick={() => setSelection('Số điện thoại')} key="text">
                                Số điện thoại
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
