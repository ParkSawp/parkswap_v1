// components/ParkSwap.js
"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import AppStyles from "../../../public/css/app.module.css";
import styles from "../../../public/css/home.module.css";
import AppSettingsModal from "../../components/AppSettingsModal/AppSettingsModal";
import Menu from "../../components/Menu/Menu";
// import { Howl, Howler } from "howler";

// import Modal from "../../components/app/Modal";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function Home() {
  const [isSettingsOpen, setIsSettingOpen] = useState(false);
  const [settingsButtonVal, setSettingsButtonVal] = useState("...");
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const openSettings = () => {
    setIsSettingOpen(true);
    setSettingsButtonVal("");
  };
  const closeSettings = () => {
    setIsSettingOpen(false);
    setSettingsButtonVal("...");
  };

  return (
    <>
      <Head>
        <title>Parkswap | App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={AppStyles["site-wrapper"]}>
        <AppSettingsModal isOpen={isSettingsOpen} closeModal={closeSettings} />
        <Menu
          openSettings={openSettings}
          settingsButtonVal={settingsButtonVal}
        />
        <div className={styles["home-wrapper"]}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles["home-container"]}
          >
            <Link href="/portfolio" className={styles["home-option"]}>
              <div className={styles["home-option-title"]}>Portfolio</div>
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
              <div className={styles["home-option-title"]}>Swap</div>
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
              <div className={styles["home-option-title"]}>Market</div>
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
            <Link href="/market" className={styles["home-option"]}>
              <div className={styles["home-option-title"]}>Blog</div>
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
            <Link href="/bridge" className={styles["home-option"]}>
              <div className={styles["home-option-title"]}>Bridge</div>
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
          </motion.div>
        </div>
        <div className={AppStyles["app-footer"]}>© 2024 ParkSwap</div>
      </div>
    </>
  );
}
