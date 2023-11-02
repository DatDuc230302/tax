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
            url: `${serverBackend}/api/v1/upload-images`,
            defaultHandlerSuccess: (data) => {
                return {
                    files: [data],
                };
            },
        },
    };
    return <JoditEditor value={content} config={config} onChange={(newContent) => setContent(newContent)} />;
}
