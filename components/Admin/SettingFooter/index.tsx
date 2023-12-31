import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function SettingFooter({ data, setData, updateData }: { data: any; setData: any; updateData: any }) {
    const [themeColor, setThemeColor] = useState<string>(''); // Default color
    const [footerColor, setFooterColor] = useState<string>(''); // Default color

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleThemeColor = (newColor: any) => {
        setThemeColor(newColor.hex);
    };

    const handleFooterColor = (newColor: any) => {
        setFooterColor(newColor.hex);
    };

    return (
        <div className="flex justify-center">
            {data && (
                <div className="flex flex-col gap-4 w-[400px]">
                    <Popover placement="right">
                        <PopoverTrigger>
                            <Button className="relative p-0">
                                <Input type="text" value={data['theme_color']} label="Màu nền Theme" />
                                <div className="absolute w-full h-full cursor-pointer"></div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <SketchPicker color={themeColor} onChange={handleThemeColor} />
                        </PopoverContent>
                    </Popover>
                    <Popover placement="right">
                        <PopoverTrigger>
                            <Button className="relative p-0">
                                <Input type="text" value={data['footer_color']} label="Màu nền Footer" />
                                <div className="absolute w-full h-full cursor-pointer"></div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <SketchPicker color={footerColor} onChange={handleFooterColor} />
                        </PopoverContent>
                    </Popover>
                    <Input
                        type="text"
                        name="footer_owner"
                        value={data.footer_owner}
                        onChange={handleInputChange}
                        label="Người sở hữu"
                    />
                    <Input
                        type="text"
                        placeholder="Địa chỉ"
                        name="footer_address"
                        value={data.footer_address}
                        onChange={handleInputChange}
                        label="Địa chỉ"
                    />
                    <Input
                        type="text"
                        name="footer_phone"
                        value={data.footer_phone}
                        onChange={handleInputChange}
                        label="Số điện thoại"
                    />
                    <Input
                        type="text"
                        name="footer_email"
                        label="Email"
                        value={data.footer_email}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        label="Giờ làm việc"
                        name="footer_working_hours"
                        value={data.footer_working_hours}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        label="Tên Website"
                        name="footer_website"
                        value={data.footer_website}
                        onChange={handleInputChange}
                    />
                    <Button color="primary" onClick={updateData}>
                        Cập nhật Footer
                    </Button>
                </div>
            )}
        </div>
    );
}
