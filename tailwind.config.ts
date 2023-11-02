import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sansSerif: ['sans-serif'],
                openSans: ['Open Sans'],
                merriweather: ['Merriweather'],
                roboto: ['roboto'],
            },
            width: {
                wMain: '1270px',
            },
            colors: {
                colorLink: '#64a1fb',
            },
        },
        screens: {
            xs: '475px',
            '3xl': '2200px',
            ...defaultTheme.screens,
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
export default config;
