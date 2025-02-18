"use client"
import {useCallback, useEffect, useState} from "react";
import useAppSettings from "@/src/hooks/useAppSettings";
import {COLOR_SCHEME, getDefaultColorScheme, getSavedColorScheme} from "@/src/hooks/contexts";

export default function useColorScheme() {

    const [colorScheme, setColorScheme] = useState(null);
    const { setColorScheme: setAppColorScheme } = useAppSettings();

    const changeColorScheme = useCallback((newColorScheme, custom = true) => {
        setColorScheme(newColorScheme);
        setAppColorScheme(newColorScheme);
        if(custom) {
            localStorage.setItem(COLOR_SCHEME, newColorScheme);
        }
    }, [setAppColorScheme, setColorScheme]);

    useEffect(() => {
        setColorScheme(getDefaultColorScheme());
    }, []);

    useEffect(() => {
        const callback = (event) => {
            changeColorScheme(event.matches ? "dark" : "light");
        };
        const target = window.matchMedia('(prefers-color-scheme: dark)');
        target.addEventListener('change', callback);
        return () => {
            target.removeEventListener('change', callback);
        };
    }, [changeColorScheme]);

    return {
        colorScheme,
        changeColorScheme
    }
}