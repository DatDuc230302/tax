import DocumentsClient from '@/components/Client/DocumentsClient';
import React from 'react';

export default function Page() {
    return (
        <div className="flex justify-center min-h-[700px]">
            <div className="flex w-wMain">
                <h2>Văn bản</h2>
                {<DocumentsClient />}
            </div>
        </div>
    );
}
