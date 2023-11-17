import React, { useMemo, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { serverBackend } from '@/server';

export default function Ckeditor({ content, setContent }) {
    const editor = useRef(null);

    const config = {
        readonly: false,
        toolbarAdaptive: false,
        toolbarSticky: false,
        fullsize: false,
        globalFullSize: false,
        uploader: {
            insertImageAsBase64URI: true,
        },
        language: 'vi',
        messages: {
            'Insert image URL': 'Chèn URL hình ảnh',
        },
    };

  return useMemo( () => ( 
<JoditEditor ref={editor} value={content} config={config} onChange={content => setContent(content)} /> 
), [] )
}
