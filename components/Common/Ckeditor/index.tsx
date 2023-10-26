import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { serverBackend } from '@/server';

export default function Ckeditor({ content, setContent }: { content: string; setContent: any }) {
    const handleCkeditor = (event: any, editor: any) => {
        const data: any = editor.getData();
        setContent(data);
    };
    return (
        <CKEditor
            data={content}
            onChange={handleCkeditor}
            editor={ClassicEditor}
            config={{
                ckfinder: {
                    uploadUrl: `${serverBackend}/api/v1/upload-images`,
                },
            }}
        />
    );
}
