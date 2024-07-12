'use client'

import styles from "./AppSettingsModal.module.css";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from 'react';
export default function AppSettingsModal({isOpen,closeModal}) {
    if(isOpen){
        return(
        <div className={styles["AppSettingsContainerWrapper"]} onClick={closeModal}>
          <motion.div 
           initial={{ scale: 0, originX: 1, originY: 0 }}
           animate={{ scale: isOpen ? 1 : 0, originX: 1, originY: 0 }}
           transition={{ duration: 0.3 }}
          className={styles["AppSettingsContainer"]} onClick={(e) => e.stopPropagation()}>
            <div className={styles["ContainerHeader"]}>
                Global Settings
                <span onClick={closeModal}>
                    <svg width="25px" height="25px">
                                            <title>Ether</title>
                                            <image width="25px" height="25px" href="/svg/icons/cross.svg"/>
                    </svg>
                </span>
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
                                <svg width="16px" height="16px">
                                        <title>Edit</title>
                                        <image width="16px" height="16px" href="/svg/icons/arrow_right.svg"/>
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
                                <svg width="16px" height="16px">
                                        <title>Edit</title>
                                        <image width="16px" height="16px" href="/svg/icons/arrow_right.svg"/>
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
                                <svg width="16px" height="16px">
                                        <title>Edit</title>
                                        <image width="16px" height="16px" href="/svg/icons/arrow_right.svg"/>
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
                                <svg width="16px" height="16px">
                                        <title>Edit</title>
                                        <image width="16px" height="16px" href="/svg/icons/arrow_right.svg"/>
                                </svg>
                            </div>
                            <div className={styles["BodyValue"]}>Sounds</div>
                            <div className={styles["BodyName"]}>Activate or deactive</div>
                        </span>
                    </li>
                </ul>
            </div>
          </motion.div>
        </div>);
    }else{
        return null;
    }
}