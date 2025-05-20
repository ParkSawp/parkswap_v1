import React from 'react'
import styles from "@/src/components/Portfolio/PortfolioWallet/portfolio-wallet.module.css";
import {useTranslation} from "react-i18next";

export default function TokenType({ token }) {
    const { t } = useTranslation();

    if(token.is?.native) {
        return (
            <span className={styles['token-type']+' '+styles['is-native']}>
                {t('Native')}
            </span>
        )
    }

    if(token.is?.stablecoin) {
        return (
            <span className={styles['token-type']+' '+styles['is-stablecoin']}>
                {t('Stablecoin')}
            </span>
        );
    }

    return (
        <span className={styles['token-type']+' '+styles['is-token']}>
            {t('Token')}
        </span>
    );
}