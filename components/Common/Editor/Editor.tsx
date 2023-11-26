import React, { useMemo, useRef } from 'react';
import JoditEditor from 'jodit-react';

export default function Editor({ content, setContent }: { content: any; setContent: any }) {
    const editor = useRef<any>(null);

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

    return useMemo(
        () => <JoditEditor ref={editor} value={content} config={config} onChange={(content) => setContent(content)} />,
        [],
    );
}
