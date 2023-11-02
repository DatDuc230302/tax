import React from 'react';
import JoditEditor from 'jodit-react';
import { serverBackend } from '@/server';

export default function Ckeditor({ content, setContent }) {
    const config = {
    readonly: false,
    toolbarAdaptive: false,
    toolbarSticky: false,
    uploader: {
        insertImageAsBase64URI: true,
    },
    language: 'vi', 
    messages: {
        'Insert image URL': 'Chèn URL hình ảnh',
    },
};

return <JoditEditor value={content} config={config} onChange={(newContent) => setContent(newContent)} />;
}
