// components/ParkSwap.js
"use client";

import Link from "next/link";
import styles from "../../../public/css/home.module.css";

import { motion } from "framer-motion";
import React, { useState } from "react";
import AppLayout from "@/src/app/AppLayout";
import Translate from "@/src/components/Translate/Translate";
import {useTranslation} from "react-i18next";

export default function Home() {

  const { t } = useTranslation();


  return (
      <AppLayout header={{ title: t('ParkSwap | Home') }} >
        <motion.div
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className={styles["home-container"]}
        >
          <Link href="/portfolio" className={styles["home-option"]}>
            <div className={styles["home-option-title"]}>
              <Translate>Portfolio</Translate>
            </div>
            <div className={styles["home-option-icon"]}>
              <svg width="80px" height="80px">
                <title>Portfolio</title>
                <image
                    width="80px"
                    height="80px"
                    href="/svg/icons/portfolio2.svg"
                />
              </svg>
            </div>
          </Link>
          <Link href="/app" className={styles["home-option"]}>
            <div className={styles["home-option-title"]}>
              <Translate>Swap</Translate>
            </div>
            <div className={styles["home-option-icon"]}>
              <svg width="80px" height="80px">
                <title>Swap</title>
                <image
                    width="80px"
                    height="80px"
                    href="/svg/icons/swap.svg"
                />
              </svg>
            </div>
          </Link>
          <Link href="/market" className={styles["home-option"]}>
            <div className={styles["home-option-title"]}>
              <Translate>Market</Translate>
            </div>
            <div className={styles["home-option-icon"]}>
              <svg width="80px" height="80px">
                <title>Market</title>
                <image
                    width="80px"
                    height="80px"
                    href="/svg/icons/market.svg"
                />
              </svg>
            </div>
          </Link>
          <Link href="/bridge" className={styles["home-option"]}>
            <div className={styles["home-option-title"]}>
              <Translate>Bridge</Translate>
            </div>
            <div className={styles["home-option-icon"]}>
              <svg width="80px" height="80px">
                <title>Bridge</title>
                <image
                    width="80px"
                    height="80px"
                    href="/svg/icons/bridge.svg"
                />
              </svg>
            </div>
          </Link>
          <Link href="/market" className={styles["home-option"]}>
            <div className={styles["home-option-title"]}>
              <Translate>Blog</Translate>
            </div>
            <div className={styles["home-option-icon"]}>
              <svg width="80px" height="80px">
                <title>Blog</title>
                <image
                    width="80px"
                    height="80px"
                    href="/svg/icons/blog.svg"
                />
              </svg>
            </div>
          </Link>
        </motion.div>
      </AppLayout>
  );
}
