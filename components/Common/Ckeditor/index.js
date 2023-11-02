import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { serverBackend } from '@/server';

export default function Ckeditor({ content, setContent }) {
    const handleCkeditor = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    const editorConfiguration = {
        ckfinder: {
            uploadUrl: `${serverBackend}/api/v1/upload-images`,
        },
        toolbar: {
            items: ['heading'],
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:slide',
            ],
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
        placeholder: 'Nội dung bài viết',
    };

    return <CKEditor data={content} onChange={handleCkeditor} editor={Editor} config={editorConfiguration} />;
}
