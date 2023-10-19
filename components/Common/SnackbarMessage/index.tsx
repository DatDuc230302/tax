import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';

export default function SnackbarMessage({ type, title }: { type: number; title: string }) {
    const [turn, setTurn] = useState<boolean>(true);

    const renderUI = () => {
        switch (type) {
            case 1:
                return (
                    <Alert onClose={() => setTurn(false)} severity="success" sx={{ width: '100%' }}>
                        {title}
                    </Alert>
                );
            case 2:
                return (
                    <Alert onClose={() => setTurn(false)} severity="info" sx={{ width: '100%' }}>
                        {title}
                    </Alert>
                );
            case 3:
                return (
                    <Alert onClose={() => setTurn(false)} severity="warning" sx={{ width: '100%' }}>
                        {title}
                    </Alert>
                );
            case 4:
                return (
                    <Alert onClose={() => setTurn(false)} severity="error" sx={{ width: '100%' }}>
                        {title}
                    </Alert>
                );
            default:
                return;
        }
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={turn}
            autoHideDuration={2000}
            onClose={() => setTurn(false)}
            message={title}
        >
            {renderUI()}
        </Snackbar>
    );
}
