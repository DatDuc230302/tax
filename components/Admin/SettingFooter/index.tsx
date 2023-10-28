import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

export default function SettingFooter() {
    const [themeColor, setThemeColor] = useState<string>('ffff');
    const [data, setData] = useState<object>({
        theme_color: '',
        footer_color: '',
        footer_owner: '',
        footer_address: '',
        footer_phone: '',
        footer_email: '',
        footer_working_hours: '',
        footer_website: '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/v1/ReadSetting')
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => {
                console.error('Error loading config:', error);
            });
    }, []);

    const handleSave = () => {
        fetch('http://localhost:8000/api/v1/UpdateSetting', {
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
                } else {
                    console.error('Config update failed:', response.error);
                }
            })
            .catch((error) => {
                console.error('Error updating config:', error);
            });
    };

    const handleColorChange = (newColor: any) => {
        setThemeColor(newColor.hex);
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-4 w-[400px]">
                <Popover placement="right">
                    <PopoverTrigger>
                        <Button className="relative p-0">
                            <Input type="text" value={themeColor} label="Màu nền Footer" />
                            <div className="absolute w-full h-full cursor-pointer"></div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <SketchPicker color={themeColor} onChange={handleColorChange} />
                    </PopoverContent>
                </Popover>
                <Popover placement="right">
                    <PopoverTrigger>
                        <Button className="relative p-0">
                            <Input type="text" value={themeColor} label="Màu nền Footer" />
                            <div className="absolute w-full h-full cursor-pointer"></div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <SketchPicker color={themeColor} onChange={handleColorChange} />
                    </PopoverContent>
                </Popover>
                <Input type="text" placeholder="Người sỡ hữu" />
                <Input type="text" placeholder="Địa chỉ" />
                <Input type="text" placeholder="Số điện thoại" />
                <Input type="text" placeholder="Email" />
                <Input type="text" placeholder="Giờ làm việc" />
                <Input type="text" placeholder="Website" />
                <Button color="primary">Cập nhật</Button>
            </div>
        </div>
    );
}
