'use client'

import styles from "./AppSettingsModal.module.css";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from 'react';
export default function AppSettingsModal() {
    return (
        <>
          <div className={styles["AppSettingsContainer"]}>
            <div className={styles["ContainerHeader"]}>
                Global Settings
            </div>
            <div className={styles["ContainerBody"]}>
                <ul>
                    <li>
                        <span>
                            <div className={styles["BodyHeader"]}>
                                <svg width="25px" height="25px">
                                        <title>Ether</title>
                                        <image width="25px" height="25px" href="/svg/icons/moon.svg"/>
                                </svg>
                            </div>
                            <div className={styles["BodyValue"]}>AUTOMATIC</div>
                            <div className={styles["BodyName"]}>Theme for the Web</div>
                        </span>
                    </li>
                    <li>
                        <span>
                            <div className={styles["BodyHeader"]}>
                                <svg width="25px" height="25px">
                                        <title>Ether</title>
                                        <image width="25px" height="25px" href="/svg/icons/usa.svg"/>
                                </svg>
                            </div>
                            <div className={styles["BodyValue"]}>English</div>
                            <div className={styles["BodyName"]}>Choose language</div>
                        </span>
                    </li><li>
                        <span>
                            <div className={styles["BodyHeader"]}>
                                <svg width="25px" height="25px">
                                        <title>Ether</title>
                                        <image width="25px" height="25px" href="/svg/icons/space.svg"/>
                                </svg>
                            </div>
                            <div className={styles["BodyValue"]}>Space (1000)</div>
                            <div className={styles["BodyName"]}>Thousand separator</div>
                        </span>
                    </li><li>
                        <span>
                            <div className={styles["BodyHeader"]}>
                                <svg width="25px" height="25px">
                                        <title>Ether</title>
                                        <image width="25px" height="25px" href="/svg/icons/volume.svg"/>
                                </svg>
                            </div>
                            <div className={styles["BodyValue"]}>Sounds</div>
                            <div className={styles["BodyName"]}>Activate or deactive</div>
                        </span>
                    </li>
                </ul>
            </div>
          </div>
        </>
      );
}