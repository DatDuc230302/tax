import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button, Spinner } from '@nextui-org/react';
import React, { useState } from 'react';

export default function DialogLoading({ content }: { content: string }) {
    return (
        <Dialog open={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogContent className="flex select-none justify-center gap-2 flex-col h-[150px] items-center">
                <Spinner size="lg" />
                <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
