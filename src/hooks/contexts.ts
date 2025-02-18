"use client"
import { createContext } from 'react';

export const COLOR_SCHEME = 'COLOR_SCHEME';
export const getSavedColorScheme = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(COLOR_SCHEME);
    }
}
export const getDefaultColorScheme = () => {
    let defaultColorScheme = null;

    if (typeof window !== 'undefined') {
        defaultColorScheme = localStorage.getItem(COLOR_SCHEME);
    }

    console.log({ defaultColorScheme });
    if(defaultColorScheme) {
        return defaultColorScheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

export const APP_SETTINGS_DEFAULT = {
    selectedChainId: '8453',
    colorScheme: getDefaultColorScheme(),
    slippage: 0,
    local: 'en_EN',

    setSlippage: () => {},
    setColorScheme: (mode: string) => {},
    setLocal: (lang: string) => {}
};

export const AppSettingContext = createContext(APP_SETTINGS_DEFAULT);