// components/ParkSwap.js
"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "../../../public/css/app.module.css";
import SwapContainer from "../../components/AppSwapContainer/AppSwapContainer";
import AppSettingsModal from "../../components/AppSettingsModal/AppSettingsModal";
import ChartContainer from "../../components/AppChartContainer/AppChartContainer";
import Menu from "../../components/Menu/Menu";

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
      <div className={styles["site-wrapper"]}>
        <AppSettingsModal isOpen={isSettingsOpen} closeModal={closeSettings} />
        <Menu
          openSettings={openSettings}
          settingsButtonVal={settingsButtonVal}
        />
        <div className={styles["app-container"]}>
          <SwapContainer
            setIsGraphOpen={setIsGraphOpen}
            isGraphOpen={isGraphOpen}
            isWalletConnected={isWalletConnected}
            setIsWalletConnected={setIsWalletConnected}
          />
          <ChartContainer isGraphOpen={isGraphOpen} />
        </div>
        <div className={styles["app-footer"]}>© 2024 ParkSwap</div>
      </div>
    </>
  );
}
