import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
    return (
        <div className="flex w-full h-[100vh] select-none ">
            <div className="w-full h-full pb-[200px] flex justify-center items-center bg-black">
                <div className="w-[500px] relative flex-col text-white flex justify-center items-center">
                    <h2 className="text-[200px] font-bold text-[#ccc] ">404</h2>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-center w-full">Trang này không tồn tại trên hệ thống.</div>
                        <div className="flex gap-3">
                            <Link href={'/'}>
                                <Button size="large" className="bg-white" variant="contained">
                                    Trở về trang chủ
                                </Button>
                            </Link>
                            <Button size="large" variant="outlined">
                                Liên hệ với chúng tôi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
