'use client';

import React, { useEffect, useState } from 'react';
import SnackbarMessage from '../SnackbarMessage';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function CheckNetwork() {
    const [turn, setTurn] = useState<boolean>(false);

    useEffect(() => {
        check();
    }, []);

    const check = async () => {
        try {
            const result: any = await axios.get(`${serverBackend}/api/v1/post`);
        } catch (err: any) {
            if (err.message === 'Network Error') {
                setTurn(true);
            }
        }
    };

    return turn && <SnackbarMessage title="Không thể kết nối đến máy chủ" type={4} alwaysTurn={true} position="l" />;
}
