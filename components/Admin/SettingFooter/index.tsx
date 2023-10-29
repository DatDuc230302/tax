import { serverBackend } from '@/server';
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

export default function SettingFooter() {
    const [data, setData] = useState<any>({
        theme_color: '',
        footer_color: '',
        footer_owner: '',
        footer_address: '',
        footer_phone: '',
        footer_email: '',
        footer_working_hours: '',
        footer_website: '',
    });

    const [themeColor, setThemeColor] = useState(); // Default color
    const [footerColor, setFooterColor] = useState(); // Default color

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {
        fetch(`${serverBackend}/api/v1/ReadSetting`)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => {
                console.error('Error loading config:', error);
            });
    }, []);

    const handleSave = () => {
        fetch(`${serverBackend}/api/v1/UpdateSetting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.message === 'success') {
                    console.log('Config updated successfully');
                    window.location.reload();
                } else {
                    console.error('Config update failed:', response.error);
                }
            })
            .catch((error) => {
                console.error('Error updating config:', error);
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
                    placeholder="Người sỡ hữu"
                    name="footer_owner"
                    value={data['footer_owner']}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    placeholder="Địa chỉ"
                    name="footer_address"
                    value={data['footer_address']}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    placeholder="Số điện thoại"
                    name="footer_phone"
                    value={data['footer_phone']}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    placeholder="Email"
                    name="footer_email"
                    value={data['footer_email']}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    placeholder="Giờ làm việc"
                    name="footer_working_hours"
                    value={data['footer_working_hours']}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    placeholder="Website"
                    name="footer_website"
                    value={data['footer_website']}
                    onChange={handleInputChange}
                />
                <Button color="primary" onClick={handleSave}>
                    Cập nhật
                </Button>
            </div>
        </div>
    );
}