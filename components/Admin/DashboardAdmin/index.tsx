'use client';

import React, { useEffect } from 'react';
import { styled, createTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

export default function DashboardAdmin() {
    useEffect(() => {
        document.title = 'Dashboard Admin';
    }, []);
    return (
        <Box component="main" className="flex justify-center w-full h-full">
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Chart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Deposits />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Orders />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
