import { Alert, Snackbar } from '@mui/material';
import React, { useEffect } from 'react';

export default function SnackbarTimeout({ turn, setTurn, title }: { turn: boolean; setTurn: any; title: string }) {
    useEffect(() => {
        setTimeout(() => {
            setTurn(false);
        }, 2000);
    }, [turn]);

    return (
        <Snackbar className="select-none" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={turn}>
            <Alert onClose={() => setTurn(false)} severity="success" sx={{ width: '100%' }}>
                {title}
            </Alert>
        </Snackbar>
    );
}
    