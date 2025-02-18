import React from 'react';
import styles from './ColorSchemeButton.module.css';
import {AutoModeIcon, LightModeIcon, DarkModeIcon} from "@/src/components/Icon/Icon";
import useColorScheme from "@/src/hooks/useColorScheme";


export default function ColorSchemeButton({ className }) {

    const { changeColorScheme, colorScheme } = useColorScheme();
    // const colorScheme = 'light';
    const toggleColorScheme = () => {
        const scheme = colorScheme === 'light' ? 'dark' : 'light';
        changeColorScheme(scheme);
    };

    return (
        <div className={className} onClick={toggleColorScheme} >
            {
                colorScheme === 'light'
                    ? <LightModeIcon />
                    : <DarkModeIcon />
            }
        </div>
    );
}