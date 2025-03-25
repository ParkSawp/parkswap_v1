"use client"
import React, {useEffect, useState} from 'react';
import styles from "@/public/css/index.module.css";
import {useTranslation} from "react-i18next";
import i18n from "@/src/config/i18n";
import Translate from "@/src/components/Translate/Translate";

export default function HomeFeature({ feature }) {
    // const [title, setTitle] = useState(feature.title);
    // const [description, setDescription] = useState(feature.description);
    // const { t } = useTranslation();

    // useEffect(() => {
    //     setTitle(t(feature.title));
    //     setDescription(t(feature.description));
    //     console.log({ title: i18n.t(feature.title), description: i18n.t(feature.description) });
    // }, []);

    return (
        <>
            <div className={styles["feature-container"]}>
                <div className={styles["feature-icon"]}>
                    <img src={feature.icon} alt={feature.title} />
                </div>
                <div className={styles["feature-title"]}>
                    <Translate>{feature.title}</Translate>
                </div>
                <div className={styles["feature-text"]}>
                    <Translate>{feature.description}</Translate>
                </div>
                {/*<div className={styles["feature-button"]}>*/}
                {/*  Voir Plus*/}
                {/*  <svg width="26" height="26">*/}
                {/*    <image*/}
                {/*      width="26"*/}
                {/*      height="26"*/}
                {/*      href="/svg/icons/arrow_right_round.svg"*/}
                {/*    ></image>*/}
                {/*  </svg>*/}
                {/*</div>*/}
            </div>
        </>
    )
}