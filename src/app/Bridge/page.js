// components/ParkSwap.js
"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import AppStyles from "../../../public/css/app.module.css";
import styles from "../../../public/css/bridge.module.css";
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
        <motion.div
          className={styles["bridge-wrapper"]}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles["bridge-container"]}>
            <div className={styles["bridge-container-header"]}>
              <h1>Rollercoaster Transfer</h1>
              <p>Where you can bridge your funds</p>
              <span>Learn more about bridges</span>
            </div>
            <div className={styles["bridge-container-body"]}>
              <div className={styles["bridge-item"]}>
                <div className={styles["bridge-item-header"]}>Orbiter</div>
                <div className={styles["bridge-item-body"]}>&nbsp;</div>
              </div>
              <div className={styles["bridge-item"]}>
                <div className={styles["bridge-item-header"]}>Orbiter</div>
                <div className={styles["bridge-item-body"]}>&nbsp;</div>
              </div>
              <div className={styles["bridge-item"]}>
                <div className={styles["bridge-item-header"]}>Orbiter</div>
                <div className={styles["bridge-item-body"]}>&nbsp;</div>
              </div>
              <div className={styles["bridge-item"]}>
                <div className={styles["bridge-item-header"]}>Orbiter</div>
                <div className={styles["bridge-item-body"]}>&nbsp;</div>
              </div>
              <div className={styles["bridge-item"]}>
                <div className={styles["bridge-item-header"]}>Orbiter</div>
                <div className={styles["bridge-item-body"]}>&nbsp;</div>
              </div>
              <div className={styles["bridge-item"]}>
                <div className={styles["bridge-item-header"]}>Orbiter</div>
                <div className={styles["bridge-item-body"]}>&nbsp;</div>
              </div>
              <div className={styles["bridge-item"]}>
                <div className={styles["bridge-item-header"]}>Orbiter</div>
                <div className={styles["bridge-item-body"]}>&nbsp;</div>
              </div>
              <div className={styles["bridge-item"]}>
                <div className={styles["bridge-item-header"]}>Orbiter</div>
                <div className={styles["bridge-item-body"]}>&nbsp;</div>
              </div>
            </div>
          </div>
        </motion.div>
        <div className={AppStyles["app-footer"]}>© 2024 ParkSwap</div>
      </div>
    </>
  );
}
