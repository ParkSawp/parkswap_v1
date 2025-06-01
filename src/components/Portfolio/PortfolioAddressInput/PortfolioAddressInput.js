import styles from "@/public/css/portfolio.module.css";
import React from "react";
import {useTranslation} from "react-i18next";


export default function PortfolioAddressInput({ className, value, onChange }) {
    const { t } = useTranslation();

    return (
        <>
            <input
                type="text"
                placeholder={t("Enter wallet address to track")}
                className={styles["portfolio-any-address-input"]+' '+className}
                value={value}
                onInput={(e) => onChange(e.target.value)}
            />
        </>
    )
}