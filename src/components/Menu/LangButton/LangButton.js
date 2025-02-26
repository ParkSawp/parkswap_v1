import React from 'react';
import styles from './LangButton.module.css';
import { LangIcon} from "@/src/components/Icon/Icon";
import {useTranslation} from "react-i18next";
import { LANGUAGES } from "@/src/config/i18n";
import Translate from "@/src/components/Translate/Translate";

export default function LangButton({ className }) {
    const { i18n } = useTranslation();

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
    };

    return (
        <div>
            <div className={className} onClick={changeLanguage}>
                <LangIcon/>
            </div>
            <div className={styles['current-language-container']} >
                <Translate>{LANGUAGES[i18n.language]}</Translate>
            </div>
        </div>
    );
}