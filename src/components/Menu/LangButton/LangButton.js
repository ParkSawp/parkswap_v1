import React from 'react';
import styles from './LangButton.module.css';
import { LangIcon} from "@/src/components/Icon/Icon";
import {useTranslation} from "react-i18next";

export default function LangButton({ className }) {
    const { i18n } = useTranslation();

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
    }

    return (
        <div className={className} onClick={changeLanguage} >
            <LangIcon />
        </div>
    );
}