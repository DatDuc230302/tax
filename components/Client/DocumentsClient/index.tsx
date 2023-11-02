'use client';

import React, { useEffect } from 'react';

export default function DocumentsClient() {
    useEffect(() => {
        document.title = 'Văn bản';
    }, []);
    return <div>văn bản</div>;
}
