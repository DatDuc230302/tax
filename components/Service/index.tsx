import Image from 'next/image';
import React from 'react';
import css from './Service.module.scss';

interface items {
    img: string;
    title: string;
}

const list1: items[] = [
    {
        img: '/imgs/services/glass.png',
        title: 'Tra cứu thông tin người nộp thuế',
    },
    {
        img: '/imgs/services/loan.png',
        title: 'Đăng ký thuế trực tuyến',
    },
    {
        img: '/imgs/services/insurance.png',
        title: 'Kê khai thuế điện tử',
    },
    {
        img: '/imgs/services/book.png',
        title: 'Nộp thuế điện tử',
    },
];

const list2: items[] = [
    {
        img: '/imgs/services/money.png',
        title: 'Kê khai và nộp lệ phí trước bạ phương tiện điện tử',
    },
    {
        img: '/imgs/services/cent.png',
        title: 'Hoàn thuế điện tử',
    },
    {
        img: '/imgs/services/clipboard.png',
        title: 'Tra cứu hóa đơn ',
    },
    {
        img: '/imgs/services/tools.png',
        title: 'Công cụ hỗ trợ khác',
    },
];

export default function Service() {
    return (
        <div className="flex w-full flex-col select-none">
            <div className="flex w-full justify-center text-[30px]">
                <h3 className="border-b-[3px] border-[#E64558] pb-1">Dịch vụ công</h3>
            </div>
            <div className="w-full gap-[30px] mt-[20px] justify-center flex flex-wrap lg:flex lg:flex-nowrap">
                {list1.map((item: items, index: number) => (
                    <div
                        key={index} 
                        className={`${css.itemImg} w-[40%] flex flex-col relative lg:w-[25%] cursor-pointer`}
                    >
                        <div className="py-[40px] z-10 gap-4 flex flex-col px-2">
                            <div className="flex justify-center">
                                <Image
                                    className="flex w-[55px] h-[55px]"
                                    src={item.img}
                                    width={55}
                                    height={55}
                                    alt=""
                                />
                            </div>
                            <h3 className="text-white text-[21px] text-center">{item.title}</h3>
                            <h4 className="text-white text-[14px] text-center">{item.title}</h4>
                        </div>
                        <div className={`${css.itemSub}`}></div>
                    </div>
                ))}
            </div>
            <div className="w-full gap-[30px] mt-[20px] justify-center flex flex-wrap lg:flex lg:flex-nowrap">
                {list2.map((item: items, index: number) => (
                    <div
                        key={index} 
                        className={`${css.itemImg} w-[40%] flex flex-col relative lg:w-[25%] cursor-pointer`}
                    >
                        <div className="py-[40px] z-10 gap-4 flex flex-col px-2">
                            <div className="flex justify-center">
                                <Image
                                    className="flex w-[55px] h-[55px]"
                                    src={item.img}
                                    width={55}
                                    height={55}
                                    alt=""
                                />
                            </div>
                            <h3 className="text-white text-[21px] text-center">{item.title}</h3>
                            <h4 className="text-white text-[14px] text-center">{item.title}</h4>
                        </div>
                        <div className={`${css.itemSub}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
